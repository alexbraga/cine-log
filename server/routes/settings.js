const express = require("express");
const router = express.Router();
const Settings = require("../controllers/settings.controller");

router
  .route("/")
  .get(Settings.authenticateJWT, Settings.getUserDetails)
  .delete(Settings.authenticateJWT, Settings.deleteUserAccount);

router
  .route("/user")
  .patch(Settings.authenticateJWT, Settings.updateUserDetails);

router
  .route("/password")
  .patch(Settings.authenticateJWT, Settings.updatePassword);

module.exports = router;
