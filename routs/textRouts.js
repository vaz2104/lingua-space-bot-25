const express = require("express");
const router = express.Router();
const TextController = require("../controllers/TextController");

// router.get("/text", WordsetController.getAll);
router.get("/text/:slug", TextController.getBySlug);
router.get("/text/bot/:id", TextController.getByBotID);

module.exports = router;
