const express = require("express");
const passport = require("passport");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

router
  .route("/:query")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
      const tmdb = "https://api.themoviedb.org/3/search/movie?";
      const key = `&api_key=${process.env.TMDB_API_KEY}`;
      const searchString = req.params.query + key;
      const movieSearch = tmdb + searchString;

      axios
        .get(movieSearch)
        .then((response) => {
          res.send(response.data);
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    } else if (err) {
      console.log(err);
    }
  });

module.exports = router;
