const express = require("express");
const router = express.Router();
const Details = require("../controllers/details.controller");

router
  .route("/:movieId")
  .get(Details.authenticateJWT, Details.getDetails)
  .post(Details.authenticateJWT, Details.postDetails)
  .patch(Details.authenticateJWT, Details.patchDetails);

module.exports = router;
