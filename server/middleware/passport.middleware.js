const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user.model");

require("dotenv").config();

module.exports = function (passport) {
  // CONFIGURE STRATEGIES

  // Local Strategy, implemented with Passport Local Mongoose set on User model
  passport.use(User.createStrategy());

  // JWT Strategy
  // Check if token exists on request and return it
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["access_token"];
    }

    return token;
  };

  // Verify the provided token, then query for user in database
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
      },
      (payload, done) => {
        User.findById(payload.sub, (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else if (!user) {
            return done(null, false);
          }
        });
      }
    )
  );

  // CONFIGURE AUTHENTICATED SESSION
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
