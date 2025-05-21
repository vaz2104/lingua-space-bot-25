const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController");

router.post("/course", CourseController.create);
router.post("/course/assign", CourseController.assign);
router.get("/course", CourseController.getMany);
router.get("/course/assigned", CourseController.getAssigned);
router.get("/course/:id", CourseController.getByID);
router.put("/course", CourseController.update);
router.put("/course/meta", CourseController.updateMeta);
router.delete("/course/:id", CourseController.delete);

module.exports = router;
