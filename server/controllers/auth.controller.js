const passport = require("passport");
const { OAuth2Client } = require("google-auth-library");
const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const handleTokens = (refreshToken, res, callback) => {
  Token.findOneAndDelete({ token: refreshToken }, (err, foundToken) => {
    if (!err) {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      callback();
    } else {
      res.sendStatus(500);
    }
  });
};

const generateTokens = (user, response) => {
  const accessToken = user.generateJWT();
  const refreshToken = user.generateRefreshJWT();

  response.cookie("access_token", accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
    partitioned: true,
  });

  response.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
    partitioned: true,
    maxAge: 3600 * 24 * 90 * 1000,
  });
};

const register = async (req, res) => {
  try {
    User.register(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      },
      req.body.password,
      (err, user) => {
        if (err) {
          res.status(401).json({ message: err.message });
        } else {
          passport.authenticate("local")(req, res, () => {
            generateTokens(req.user, res);

            res.status(200).json({
              isAuthenticated: true,
              user: req.user.first_name,
            });
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    await passport.authenticate(
      "local",
      { session: false },
      (err, user, info) => {
        if (!user) {
          res.status(401).json({ message: "Incorrect e-mail or password" });
        } else if (err) {
          console.log(err);
        } else {
          req.login(user, (err) => {
            if (err) {
              console.log(err);
            } else {
              generateTokens(req.user, res);

              res.status(200).json({
                isAuthenticated: true,
                user: req.user.first_name,
              });
            }
          });
        }
      }
    )(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies["refresh_token"];

    handleTokens(refreshToken, res, () => {
      req.logout();
      res.status(200).json({
        success: true,
        user: "",
        isAuthenticated: false,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const google = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { given_name, family_name, email, sub } = ticket.getPayload();

    User.findOne({ email: email }, (err, user) => {
      if (!user) {
        const newUser = new User({
          first_name: given_name,
          last_name: family_name,
          email: email,
          googleId: sub,
        });

        newUser.save();

        generateTokens(newUser, res);

        res.status(201).json({
          isAuthenticated: true,
          user: given_name,
        });
      } else if (user && !user.googleId) {
        user.googleId = sub;
        user.save();

        generateTokens(user, res);

        res.status(200).json({
          isAuthenticated: true,
          user: user.first_name,
        });
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["refresh_token"];

    JWT.verify(refreshToken, process.env.REFRESH_JWT_SECRET, (err, token) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        const accessToken = JWT.sign(
          {
            iss: token.iss,
            sub: token.sub,
          },
          process.env.JWT_SECRET,
          { expiresIn: "15min" }
        );

        res.cookie("access_token", accessToken, {
          httpOnly: true,
          sameSite: "None",
          secure: process.env.NODE_ENV === "production",
          partitioned: true,
        });

        res
          .status(200)
          .json({ message: "Successfully refreshed access token" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  google,
  refreshToken,
};
