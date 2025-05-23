const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

router.post("/task", TaskController.TaskCreate);
router.get("/task", TaskController.TaskGetMany);
router.get("/task/:id", TaskController.TaskGetSingle);
router.delete("/task/:id", TaskController.TaskDelete);
router.put("/task/:id", TaskController.TaskUpdate);

router.post("/task-relation", TaskController.TaskRelationCreate);
router.get("/task-relation", TaskController.TaskRelationGetMany);
router.get("/task-relation/:id", TaskController.TaskRelationGetSingle);
router.delete("/task-relation/:id", TaskController.TaskRelationDelete);
router.put("/task-relation", TaskController.TaskRelationUpdate);

router.post("/relation-meta", TaskController.RelationMetaCreate);
router.get("/relation-meta", TaskController.RelationMetaGetMany);
router.get("/relation-meta/:id", TaskController.RelationMetaGetSingle); // find by relationId ( NOT BY _id )
router.delete("/relation-meta/:id", TaskController.RelationMetaDelete);
router.put("/relation-meta", TaskController.RelationMetaUpdate);

module.exports = router;
