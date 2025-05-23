const express = require("express");
const router = express.Router();
const LessonController = require("../controllers/LessonController");

router.post("/lesson", LessonController.LessonCreate);
router.get("/lesson", LessonController.LessonGetMany);
router.get("/lesson/:id", LessonController.LessonGetSingle);
router.delete("/lesson/:id", LessonController.LessonDelete);
router.put("/lesson/:id", LessonController.LessonUpdate);

router.post("/lesson-relation", LessonController.LessonRelationCreate);
router.get("/lesson-relation", LessonController.LessonRelationGetMany);
router.get("/lesson-relation/:id", LessonController.LessonRelationGetSingle);
router.delete("/lesson-relation/:id", LessonController.LessonRelationDelete);
router.put("/lesson-relation", LessonController.LessonRelationUpdate);

router.post("/relation-meta", LessonController.RelationMetaCreate);
router.get("/relation-meta", LessonController.RelationMetaGetMany);
router.get("/relation-meta/:id", LessonController.RelationMetaGetSingle); // find by relationId ( NOT _id )
router.delete("/relation-meta/:id", LessonController.RelationMetaDelete);
router.put("/relation-meta", LessonController.RelationMetaUpdate);

module.exports = router;
