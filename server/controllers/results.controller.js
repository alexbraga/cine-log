const passport = require("passport");
const axios = require("axios");
require("dotenv").config();

const authenticateJWT = passport.authenticate("jwt", { session: false });

const getResults = (req, res) => {
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
  } else {
    console.log("User not authenticated");
    // Handle unauthenticated user case if needed
    res.status(401).json({ message: "User not authenticated" });
  }
};

module.exports = {
  authenticateJWT,
  getResults,
};
