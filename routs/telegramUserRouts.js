const express = require("express");
const router = express.Router();
const TelegramUserController = require("../controllers/TelegramUserController");

router.post("/telegram-user", TelegramUserController.create);
router.get(
  "/telegram-user/telegram-username/:username",
  TelegramUserController.getByTelegramUsername
);
router.get(
  "/telegram-user/telegram-id/:id",
  TelegramUserController.getByTelegramId
);
router.get("/telegram-user/:id", TelegramUserController.getOne);
router.put("/telegram-user", TelegramUserController.update);
router.delete("/telegram-user/:id", TelegramUserController.delete);

module.exports = router;
