const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

router.post("/student", StudentController.create);
router.get("/student/telegramId/:id", StudentController.getByTelegramId);
router.get("/student/:id", StudentController.getOne);
router.put("/student", StudentController.update);

module.exports = router;
