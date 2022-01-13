const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const JWT = require("jsonwebtoken");
const Token = require("./token.model");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const accessToken = JWT.sign(
    {
      iss: "Cine.log",
      sub: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15min" }
  );

  return accessToken;
};

userSchema.methods.generateRefreshJWT = function () {
  const refreshToken = JWT.sign(
    {
      iss: "Cine.log",
      sub: this._id,
    },
    process.env.REFRESH_JWT_SECRET,
    { expiresIn: "90 days" }
  );

  new Token({
    userId: this._id,
    token: refreshToken,
  }).save();

  return refreshToken;
};

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 60 * 15 * 1000;
};

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  errorMessages: {
    MissingUsernameError: "No e-mail address was given",
    UserExistsError:
      "A user with the given e-mail address is already registered",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
