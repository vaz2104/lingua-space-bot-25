const express = require("express");
const router = express.Router();
const LessonController = require("../controllers/LessonController");

router.post("/lesson", LessonController.create);
router.post("/lesson/assign", LessonController.assign);
router.get("/lesson", LessonController.getMany);
router.get("/lesson/assigned", LessonController.getAssigned);
router.get("/lesson/:id", LessonController.getByID);
router.put("/lesson", LessonController.update);
router.put("/lesson/meta", LessonController.updateMeta);
router.delete("/lesson/:id", LessonController.delete);

module.exports = router;
