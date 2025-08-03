const express = require("express");
const TelegramController = require("../controllers/TelegramController");
const router = express.Router();

router.post("/telegram-group/post-task", TelegramController.PostTask);

module.exports = router;
