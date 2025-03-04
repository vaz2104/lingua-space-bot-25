const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.post("/task", TaskController.create);
// router.get("/task/:id", TaskController.getById);
router.get("/task/bot/assigned/:id", TaskController.getAssignedByBotID);
// router.put("/task", TaskController.update);
// router.delete("/task/:id", TaskController.delete);

module.exports = router;
