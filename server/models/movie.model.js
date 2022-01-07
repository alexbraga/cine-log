const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  movieId: Number,
  rating: Number,
  review: String,
  view_count: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
