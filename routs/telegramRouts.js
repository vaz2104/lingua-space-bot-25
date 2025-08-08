const express = require("express");
const TelegramController = require("../controllers/TelegramController");
const router = express.Router();

router.post("/telegram-group/post-task", TelegramController.PostTask);
router.post("/telegram-group/post-word-quiz", TelegramController.PostWordQuiz);

module.exports = router;
