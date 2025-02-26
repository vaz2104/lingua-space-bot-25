const express = require("express");
const router = express.Router();
const GrammarController = require("../controllers/GrammarController");

router.get("/grammar", GrammarController.getAll);
router.get("/grammar/:slug", GrammarController.getOneBySlug);
router.get("/grammar-rule/:slug", GrammarController.getBySlug);
router.get("/grammar-rule/bot/:id", GrammarController.getByBotID);
router.get(
  "/grammar-rule/sets-number/:id",
  GrammarController.getTotalSetsNumber
);

module.exports = router;
