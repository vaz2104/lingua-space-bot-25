const express = require("express");
const router = express.Router();
const PhrasebookController = require("../controllers/PhrasebookController");

router.get("/phrasebook", PhrasebookController.getAll);
router.get("/phrasebook/:slug", PhrasebookController.getBySlug);
router.get("/phrasebook/bot/:id", PhrasebookController.getByBotID);
router.get(
  "/phrasebook/sets-number/:id",
  PhrasebookController.getTotalSetsNumber
);

module.exports = router;
