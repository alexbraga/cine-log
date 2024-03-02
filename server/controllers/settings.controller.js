const passport = require("passport");
const User = require("../models/user.model");
const Movie = require("../models/movie.model");
const List = require("../models/list.model");

const authenticateJWT = passport.authenticate("jwt", { session: false });

const getUserDetails = (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (!err) {
      res.status(200).json({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } else {
      console.log(err.message);
    }
  });
};

const deleteUserAccount = (req, res) => {
  const deleteUser = User.findByIdAndDelete(req.user.id, (err, user) => {
    if (!err) {
      return true;
    } else {
      return err.message;
    }
  });

  const deleteMovies = Movie.deleteMany(
    { userId: req.user.id },
    (err, user) => {
      if (!err) {
        return true;
      } else {
        return err.message;
      }
    }
  );

  const deleteList = List.deleteMany(
    { userId: req.user.id, type: "Watched Movie" },
    (err, user) => {
      if (!err) {
        return true;
      } else {
        return err.message;
      }
    }
  );

  if (deleteUser && deleteMovies && deleteList) {
    res.status(200).json({
      message: "Successfully deleted account",
    });
  }
};

const updateUserDetails = (req, res) => {
  User.findByIdAndUpdate(
    req.user.id,
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    },
    (err, user) => {
      if (!err) {
        res.status(200).json({
          message: "Successfully saved changes",
        });
      } else {
        res.status(400).json({
          message: err.message,
        });
      }
    }
  );
};

const updatePassword = (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (!err) {
      user.changePassword(req.body.old_password, req.body.password, (err) => {
        if (!err) {
          res.status(200).json({
            message: "Successfully changed password",
          });
        } else {
          res.status(400).json({
            message: err.message,
          });
        }
      });
    }
  });
};

module.exports = {
  authenticateJWT,
  getUserDetails,
  deleteUserAccount,
  updateUserDetails,
  updatePassword,
};
