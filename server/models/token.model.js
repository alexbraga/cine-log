const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

tokenSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 3600 * 24 * 90 });
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
