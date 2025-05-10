const LessonService = require("../services/LessonService");

class LessonController {
  async create(req, res) {
    try {
      const data = await LessonService.create(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async assign(req, res) {
    try {
      const data = await LessonService.assign(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByID(req, res) {
    try {
      const data = await LessonService.getByID(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getMany(req, res) {
    try {
      const data = await LessonService.getMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async delete(req, res) {
    try {
      const data = await LessonService.delete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async update(req, res) {
    try {
      const data = await LessonService.update(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new LessonController();
