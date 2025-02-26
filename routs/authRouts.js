const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/auth/create-key", AuthController.createKey);
router.post("/auth/login", AuthController.login);
router.post("/auth/invite-link", AuthController.createInviteLink);

module.exports = router;
