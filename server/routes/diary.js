const express = require("express");
const router = express.Router();
const Diary = require("../controllers/diary.controller");

router.route("/").get(Diary.authenticateJWT, Diary.getDiaryEntries);

router
  .route("/:entryId")
  .patch(Diary.authenticateJWT, Diary.updateDiaryEntry)
  .delete(Diary.authenticateJWT, Diary.deleteDiaryEntry);

module.exports = router;
