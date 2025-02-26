const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.post("/admin", AdminController.create);
router.get("/admin/telegramId/:id", AdminController.getByTelegramId);
router.get("/admin/:id", AdminController.getOne);
router.put("/admin", AdminController.update);

module.exports = router;
