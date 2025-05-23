const LessonService = require("../services/LessonService");

class LessonController {
  async LessonCreate(req, res) {
    try {
      const data = await LessonService.LessonCreate(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async LessonGetMany(req, res) {
    try {
      const data = await LessonService.LessonGetMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async LessonGetSingle(req, res) {
    try {
      const data = await LessonService.LessonGetSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async LessonDelete(req, res) {
    try {
      const data = await LessonService.LessonDelete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async LessonUpdate(req, res) {
    try {
      const data = await LessonService.LessonUpdate(req?.params?.id, req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async LessonRelationCreate(req, res) {
    try {
      const data = await LessonService.LessonRelationCreate(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async LessonRelationGetMany(req, res) {
    try {
      const data = await LessonService.LessonRelationGetMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async LessonRelationGetSingle(req, res) {
    try {
      const data = await LessonService.LessonRelationGetSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async LessonRelationDelete(req, res) {
    try {
      const data = await LessonService.LessonRelationDelete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async LessonRelationUpdate(req, res) {
    try {
      const data = await LessonService.LessonRelationUpdate(
        req?.params?.id,
        req?.body
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaCreate(req, res) {
    try {
      const data = await LessonService.RelationMetaCreate(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaGetMany(req, res) {
    try {
      const data = await LessonService.RelationMetaGetMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaGetSingle(req, res) {
    try {
      const data = await LessonService.RelationMetaGetSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaDelete(req, res) {
    try {
      const data = await LessonService.RelationMetaDelete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaUpdate(req, res) {
    try {
      const data = await LessonService.RelationMetaUpdate(
        req?.params?.id,
        req?.body
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new LessonController();
