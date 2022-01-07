const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  name: String,
  type: String,
  movieId: Number,
  title: String,
  year: String,
  director: [String],
  genres: [String],
  runtime: Number,
  date: Date,
});

const List = mongoose.model("List", listSchema);

module.exports = List;
