const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.post("/task", TaskController.create);
router.post("/task/assign", TaskController.assign);
router.get("/task/:id", TaskController.getTaskByID);
router.get("/task/bot/saved", TaskController.getSavedByBotID);
router.get("/task/bot/assigned/:id", TaskController.getAssignedByBotID);
router.put("/task", TaskController.update);
router.delete("/task/:id", TaskController.delete);
router.put("/task/meta", TaskController.updateTaskMeta);

module.exports = router;
