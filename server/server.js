const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./middleware/passport.middleware")(passport);

const cors = require("cors");

require("dotenv").config();

// INITIATE APP
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

const isProduction = process.env.NODE_ENV === "production";

// Priority serve any static files
isProduction &&
  app.use(express.static(path.resolve(__dirname, "../client/build")));

// CONNECT TO DATABASE
// db config
const dbConnection = isProduction
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;

mongoose.connect(dbConnection, () => {
  console.log("Successfully connected to database");
});

// ROUTES
const authRouter = require("./routes/auth");
const detailsRouter = require("./routes/details");
const diaryRouter = require("./routes/diary");
const resultsRouter = require("./routes/results");
const settingsRouter = require("./routes/settings");

app.use("/api/auth", authRouter);
app.use("/api/details", detailsRouter);
app.use("/api/diary", diaryRouter);
app.use("/api/results", resultsRouter);
app.use("/api/settings", settingsRouter);

// All remaining requests return the React app, so it can handle routing (solution found at: https://github.com/mars/heroku-cra-node/blob/c414a25250da57c73589163885e949e6f76c06e4/server/index.js#L35)
isProduction &&
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });

// DEFINE PORTS
const port = process.env.PORT || 5000;

// START SERVER
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
