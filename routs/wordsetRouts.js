const express = require("express");
const router = express.Router();
const WordsetController = require("../controllers/WordsetController");

router.get("/wordset", WordsetController.getAll);
router.get("/wordset/:slug", WordsetController.getBySlug);
router.get("/wordset/bot/:id", WordsetController.getByBotID);
router.get("/wordset/bot/full-list/:id", WordsetController.getByBotIDFullList);
router.get("/wordset/sets-number/:id", WordsetController.getTotalSetsNumber);

module.exports = router;
