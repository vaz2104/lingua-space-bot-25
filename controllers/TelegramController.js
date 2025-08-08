const TelegramService = require("../services/TelegramService");

class TelegramController {
  async PostTask(req, res) {
    try {
      const data = await TelegramService.PostTask(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async PostWordQuiz(req, res) {
    try {
      const data = await TelegramService.PostWordQuiz(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new TelegramController();
