const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user.model");
const Movie = require("../models/movie.model");
const List = require("../models/list.model");

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
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
  })
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
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
  });

router
  .route("/user")
  .patch(passport.authenticate("jwt", { session: false }), (req, res) => {
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
  });

router
  .route("/password")
  .patch(passport.authenticate("jwt", { session: false }), (req, res) => {
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
  });

module.exports = router;
