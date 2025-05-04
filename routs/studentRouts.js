const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

// router.post("/student", StudentController.create);
// router.get("/student/telegramId/:id", StudentController.getByTelegramId);
router.get("/student/", StudentController.getOne);
router.get("/student/platform-user", StudentController.getPlatformUser);
router.get(
  "/student/panel-relations",
  StudentController.StudentPlatformRelation
);
router.get("/student/tasks/:id", StudentController.getTasks);
router.get("/student/panel/:userId", StudentController.getPanels);

module.exports = router;
