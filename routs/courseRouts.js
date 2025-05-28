const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/CourseController");

router.post("/course", CourseController.CourseCreate);
router.get("/course", CourseController.CourseGetMany);
router.get("/course/:id", CourseController.CourseGetSingle);
router.delete("/course/:id", CourseController.CourseDelete);
router.put("/course/:id", CourseController.CourseUpdate);

router.post("/course-relation", CourseController.CourseRelationCreate);
router.get("/course-relation", CourseController.CourseRelationGetMany);
router.get("/course-relation/:id", CourseController.CourseRelationGetSingle);
router.delete("/course-relation/:id", CourseController.CourseRelationDelete);
router.put("/course-relation/:id", CourseController.CourseRelationUpdate);

router.post("/course-relation-meta", CourseController.RelationMetaCreate);
router.get("/course-relation-meta", CourseController.RelationMetaGetMany);
router.get("/course-relation-meta/:id", CourseController.RelationMetaGetSingle); // find by relationId ( NOT _id )
router.delete("/course-relation-meta/:id", CourseController.RelationMetaDelete);
router.put("/course-relation-meta/:id", CourseController.RelationMetaUpdate);

module.exports = router;
