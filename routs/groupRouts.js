const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/GroupController");

router.post("/group", GroupController.create);
router.get("/group/admin", GroupController.getAll); //query params adminId, botId
router.get("/group/:id", GroupController.getOne);
router.put("/group", GroupController.update);
router.delete("/group/:id", GroupController.delete);
router.get("/group/:id/students", GroupController.getStudents);
router.post("/group/student", GroupController.addStudent);
router.delete("/group-relations/student", GroupController.deleteStudent);

module.exports = router;
