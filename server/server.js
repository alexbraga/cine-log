const express = require("express");
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

isProduction && app.use(express.static("../client/build"));

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

app.use("/auth", authRouter);
app.use("/details", detailsRouter);
app.use("/diary", diaryRouter);
app.use("/results", resultsRouter);
app.use("/settings", settingsRouter);

// DEFINE PORTS
const port = process.env.PORT || 5000;

// START SERVER
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
