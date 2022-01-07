const express = require("express");
const passport = require("passport");
const router = express.Router();
const axios = require("axios");
const Movie = require("../models/movie.model");
const List = require("../models/list.model");

require("dotenv").config();

router
  .route("/:movieId")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    const tmdb = "https://api.themoviedb.org/3/movie/";
    const movieId = req.params.movieId;
    const key = "?api_key=" + process.env.TMDB_API_KEY;
    const movieDetails = tmdb + movieId + key;
    const movieCredits = tmdb + movieId + "/credits" + key;

    function getDetails() {
      return axios.get(movieDetails);
    }

    function getCredits() {
      return axios.get(movieCredits);
    }

    Movie.findOne(
      { userId: req.user.id, movieId: movieId },
      (err, foundMovie) => {
        if (err) {
          console.log(err);
        } else if (!foundMovie) {
          Promise.all([getDetails(), getCredits()])
            .then((response) => {
              const details = response[0].data;
              const credits = response[1].data;

              res.send({
                tmdbDetails: details,
                tmdbCredits: credits,
              });
            })
            .catch((err) => console.log(err));
        } else if (foundMovie) {
          Promise.all([getDetails(), getCredits()])
            .then((response) => {
              const details = response[0].data;
              const credits = response[1].data;

              res.send({
                tmdbDetails: details,
                tmdbCredits: credits,
                userData: foundMovie,
              });
            })
            .catch((err) => console.log(err));
        }
      }
    );
  })
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    const movie = new Movie({
      userId: req.user.id,
      movieId: req.params.movieId,
      rating: req.body.rating,
      review: req.body.review,
      view_count: 1,
    });

    const diaryEntry = new List({
      type: "Watched Movie",
      userId: req.user.id,
      movieId: req.params.movieId,
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      genres: req.body.genres,
      runtime: req.body.runtime,
      date: req.body.date,
    });

    Movie.findOne(
      { userId: req.user.id, movieId: req.params.movieId },
      (err, foundMovie) => {
        if (err) {
          console.log(err);
        } else if (!foundMovie) {
          movie.save();
          diaryEntry.save();

          res.status(200).json({
            message: "Movie successfully added",
          });
        } else if (foundMovie) {
          Movie.updateOne(
            {
              userId: req.user.id,
              movieId: req.params.movieId,
            },
            { $inc: { view_count: 1 } },
            (err) => {
              if (!err) {
                res.status(200).json({
                  message: "View count successfully updated",
                });
              }
            }
          );

          diaryEntry.save();
        }
      }
    );
  })
  .patch(passport.authenticate("jwt", { session: false }), (req, res) => {
    Movie.updateOne(
      {
        userId: req.user.id,
        movieId: req.params.movieId,
      },
      {
        $set: {
          rating: req.body.rating,
          review: req.body.review,
        },
      },
      (err) => {
        if (!err) {
          res.status(200).json({
            message: "Movie successfully updated",
          });
        } else {
          console.log(err);
        }
      }
    );
  });

module.exports = router;
