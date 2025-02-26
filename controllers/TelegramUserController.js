const TelegramUserService = require("../services/TelegramUserService");

class TelegramUserController {
  async create(req, res) {
    try {
      const data = await TelegramUserService.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByTelegramUsername(req, res) {
    try {
      const data = await TelegramUserService.telegramUsername(
        req?.params?.username
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByTelegramId(req, res) {
    try {
      const data = await TelegramUserService.telegramId(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getOne(req, res) {
    try {
      const data = await TelegramUserService.getOne(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const data = await TelegramUserService.update(req.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async delete(req, res) {
    try {
      const data = await TelegramUserService.delete(req?.params?.username);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new TelegramUserController();
