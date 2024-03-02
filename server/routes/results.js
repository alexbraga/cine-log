const express = require("express");
const router = express.Router();
const Results = require("../controllers/results.controller");

router.get("/:query", Results.authenticateJWT, Results.getResults);

module.exports = router;
