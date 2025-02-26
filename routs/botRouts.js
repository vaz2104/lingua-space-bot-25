const express = require("express");
const router = express.Router();
const BotController = require("../controllers/BotController");

router.post("/bot", BotController.create);
router.get("/bot/admin/:id", BotController.getAll);
router.get("/bot/teacher/:id", BotController.getTeacherAll);
router.get("/bot/:id", BotController.getOne);
router.put("/bot", BotController.update);
router.delete("/bot/:id", BotController.delete);
router.get("/bot/:id/students", BotController.getStudents);
router.get("/bot/:id/teachers", BotController.getTeachers);
router.post("/bot/info", BotController.getInfo);

module.exports = router;
