const express = require("express");
const router = express.Router();
const GrammarController = require("../controllers/GrammarController");

router.get("/grammar-rule/get-name/:id", GrammarController.getGrammarNameByID);
router.get("/grammar-rule", GrammarController.getSingleBy);
router.get("/grammar-rule/bot/:id", GrammarController.getByBotID);
router.get(
  "/grammar-rule/sets-number/:id",
  GrammarController.getTotalSetsNumber
);

module.exports = router;
