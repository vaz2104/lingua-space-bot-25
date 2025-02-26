const BotService = require("../services/BotService");

class BotController {
  async create(req, res) {
    try {
      const bot = await BotService.create(req.body);
      res.json(bot);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getAll(req, res) {
    try {
      const bots = await BotService.getAll(req?.params?.id);
      res.json(bots);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getTeacherAll(req, res) {
    try {
      const bots = await BotService.getTeacherAll(req?.params?.id);
      res.json(bots);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getOne(req, res) {
    try {
      const bot = await BotService.getOne(req?.params?.id);
      res.json(bot);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const bot = await BotService.update(req.body);
      res.json(bot);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async delete(req, res) {
    try {
      const bot = await BotService.delete(req?.params?.id);
      res.json(bot);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getStudents(req, res) {
    try {
      const bot = await BotService.getStudents(req?.params?.id);
      res.json(bot);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getTeachers(req, res) {
    try {
      const data = await BotService.getTeachers(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getInfo(req, res) {
    try {
      const bot = await BotService.getInfo(req?.body);
      res.json(bot);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new BotController();
