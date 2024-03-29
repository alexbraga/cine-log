const express = require("express");
const router = express.Router();
const Auth = require("../controllers/auth.controller");
const Password = require("../controllers/password.controller");

// AUTHENTICATION
router.post("/register", Auth.register);

router.post("/login", Auth.login);

router.get("/logout", Auth.logout);

router.post("/google", Auth.google);

router.get("/token", Auth.refreshToken);

// PASSWORD RESET
router.post("/recover", Password.recover);

router
  .route("/reset/:token")
  .get(Password.reset)
  .post(Password.resetPassword);

module.exports = router;
