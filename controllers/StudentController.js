const StudentService = require("../services/StudentService");

class StudentController {
  async create(req, res) {
    try {
      const bot = await StudentService.create(req.body);
      res.json(bot);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByTelegramId(req, res) {
    try {
      const bots = await StudentService.getByTelegramId(req?.params?.id);
      res.json(bots);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getOne(req, res) {
    try {
      const bot = await StudentService.getOne(req?.params?.id);
      res.json(bot);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const bot = await StudentService.update(req.body);
      res.json(bot);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new StudentController();
