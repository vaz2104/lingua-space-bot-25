const express = require("express");
const router = express.Router();
const TextController = require("../controllers/TextController");

// router.get("/text", WordsetController.getAll);
router.get("/text/:id", TextController.getSingleBy);
router.get("/text/get-name/:id", TextController.getTextsNameByID);
router.get("/text/bot/:id", TextController.getByBotID);
router.get("/text/sets-number/:id", TextController.getTotalSetsNumber);

module.exports = router;
