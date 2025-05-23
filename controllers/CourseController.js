const CourseService = require("../services/CourseService");

class CourseController {
  async CourseCreate(req, res) {
    try {
      const data = await CourseService.CourseCreate(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async CourseGetMany(req, res) {
    try {
      const data = await CourseService.CourseGetMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async CourseGetSingle(req, res) {
    try {
      const data = await CourseService.CourseGetSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async CourseDelete(req, res) {
    try {
      const data = await CourseService.CourseDelete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async CourseUpdate(req, res) {
    try {
      const data = await CourseService.CourseUpdate(req?.params?.id, req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async CourseRelationCreate(req, res) {
    try {
      const data = await CourseService.CourseRelationCreate(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async CourseRelationGetMany(req, res) {
    try {
      const data = await CourseService.CourseRelationGetMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async CourseRelationGetSingle(req, res) {
    try {
      const data = await CourseService.CourseRelationGetSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async CourseRelationDelete(req, res) {
    try {
      const data = await CourseService.CourseRelationDelete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async CourseRelationUpdate(req, res) {
    try {
      const data = await CourseService.CourseRelationUpdate(
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
      const data = await CourseService.RelationMetaCreate(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaGetMany(req, res) {
    try {
      const data = await CourseService.RelationMetaGetMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaGetSingle(req, res) {
    try {
      const data = await CourseService.RelationMetaGetSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaDelete(req, res) {
    try {
      const data = await CourseService.RelationMetaDelete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaUpdate(req, res) {
    try {
      const data = await CourseService.RelationMetaUpdate(
        req?.params?.id,
        req?.body
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new CourseController();
