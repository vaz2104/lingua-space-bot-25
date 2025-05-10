const CourseService = require("../services/CourseService");

class CourseController {
  async create(req, res) {
    try {
      const data = await CourseService.create(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async assign(req, res) {
    try {
      const data = await CourseService.assign(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByID(req, res) {
    try {
      const data = await CourseService.getByID(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getMany(req, res) {
    try {
      const data = await CourseService.getMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async delete(req, res) {
    try {
      const data = await CourseService.delete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async update(req, res) {
    try {
      const data = await CourseService.update(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new CourseController();
