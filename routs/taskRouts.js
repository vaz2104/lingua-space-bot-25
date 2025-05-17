const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.post("/task", TaskController.create);
router.post("/task/assign", TaskController.assign);
router.get("/task/assigned", TaskController.getAssigned);
router.get("/task/meta", TaskController.getTaskMeta);
router.get("/task/:id", TaskController.getTaskByID);
router.get("/task/relation/:id", TaskController.getTaskRelationByID);
router.get("/task/bot/saved", TaskController.getSavedByBotID);
router.put("/task", TaskController.update);
router.delete("/task/:id", TaskController.delete);
router.put("/task/meta", TaskController.updateTaskMeta);

module.exports = router;
