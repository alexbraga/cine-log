const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const router = express.Router();
const Movie = require("../models/movie.model");
const List = require("../models/list.model");

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    List.aggregate(
      [
        {
          $match: {
            userId: mongoose.Types.ObjectId(req.user.id),
            type: "Watched Movie",
          },
        },
        {
          $lookup: {
            from: "movies",
            let: { movie_id: "$movieId", user_id: "$userId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$movieId", "$$movie_id"] },
                      { $eq: ["$userId", "$$user_id"] },
                    ],
                  },
                },
              },
              { $project: { _id: 0, __v: 0 } },
            ],
            as: "details",
          },
        },
        { $project: { __v: 0 } },
      ],
      (err, foundList) => {
        if (!err) {
          res.send(foundList);
        } else {
          console.log(err);

          res.status(500).json({
            message: err.message,
          });
        }
      }
    );
  })
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    List.deleteMany(
      {
        userId: req.user.id,
        type: "Watched Movie",
      },
      (err) => {
        if (!err) {
          res.status(200).json({
            message: "Successfully removed all entries",
          });
        } else {
          console.log(err);

          res.status(500).json({
            message: err.message,
          });
        }
      }
    );
  });

router
  .route("/:entryId")
  .patch(passport.authenticate("jwt", { session: false }), (req, res) => {
    const updateListEntry = List.findByIdAndUpdate(
      req.params.entryId,
      { date: req.body.date },
      (err, entry) => {
        if (!err) {
          return true;
        } else {
          console.log(err);
        }
      }
    );

    const updateMovieEntry = Movie.updateOne(
      {
        userId: req.user.id,
        movieId: req.body.movieId,
      },
      {
        $set: {
          rating: req.body.rating,
          review: req.body.review,
        },
      },
      (err) => {
        if (!err) {
          return true;
        } else {
          console.log(err);
        }
      }
    );

    if (updateListEntry && updateMovieEntry) {
      res.status(200).json({
        message: "Successfully updated entry",
      });
    }
  })
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    const deleteListEntry = List.findByIdAndDelete(
      req.params.entryId,
      (err) => {
        if (!err) {
          return true;
        } else {
          console.log(err);
        }
      }
    );

    const updateMovieEntry = Movie.updateOne(
      {
        userId: req.user.id,
        movieId: req.body.movieId,
      },
      { $inc: { view_count: -1 } },
      (err) => {
        if (!err) {
          return true;
        } else {
          console.log(err);
        }
      }
    );

    if (deleteListEntry && updateMovieEntry) {
      res.status(200).json({
        message: "Successfully deleted entry",
      });
    }
  });

module.exports = router;
