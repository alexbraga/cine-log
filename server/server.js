const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./middleware/passport.middleware")(passport);

const cors = require("cors");

require("dotenv").config();

// INITIATE APP
const app = express();

const isProduction = process.env.NODE_ENV === "production";

const clientURL = isProduction
  ? process.env.CLIENT_URL_PROD
  : process.env.CLIENT_URL_DEV;

// CONFIGURE CORS
const corsOptions = {
  origin: clientURL,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(passport.initialize());

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

// DEFINE PORTS
const port = process.env.PORT || 5000;

// START SERVER
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
