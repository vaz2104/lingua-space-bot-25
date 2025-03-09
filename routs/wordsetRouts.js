const express = require("express");
const router = express.Router();
const WordsetController = require("../controllers/WordsetController");

router.get("/wordset", WordsetController.getAll);
router.get("/wordset/:id", WordsetController.getSingleBy);
router.get("/wordset/bot/:id", WordsetController.getByBotID);
router.get("/wordset/bot/full-list/:id", WordsetController.getByBotIDFullList);
router.get("/wordset/sets-number/:id", WordsetController.getTotalSetsNumber);
router.get("/wordset/get-name/:id", WordsetController.getNameByID);

module.exports = router;
