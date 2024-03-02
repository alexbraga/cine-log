const passport = require("passport");
const mongoose = require("mongoose");
const Movie = require("../models/movie.model");
const List = require("../models/list.model");

const authenticateJWT = passport.authenticate("jwt", { session: false });

const getDiaryEntries = (req, res) => {
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
};

const updateDiaryEntry = (req, res) => {
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
};

const deleteDiaryEntry = (req, res) => {
  const deleteListEntry = List.findByIdAndDelete(req.params.entryId, (err) => {
    if (!err) {
      return true;
    } else {
      console.log(err);
    }
  });

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
};

module.exports = {
  authenticateJWT,
  getDiaryEntries,
  updateDiaryEntry,
  deleteDiaryEntry,
};
