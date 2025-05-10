const express = require("express");
const router = express.Router();
const LessonController = require("../controllers/LessonController");

router.post("/lesson", LessonController.create);
router.post("/lesson/assign", LessonController.assign);
router.get("/lesson", LessonController.getMany);
router.get("/lesson/:id", LessonController.getByID);
router.put("/lesson", LessonController.update);
router.delete("/lesson/:id", LessonController.delete);

module.exports = router;
