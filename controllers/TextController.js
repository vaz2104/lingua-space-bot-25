const TextService = require("../services/TextService");

class TextController {
  async getBySlug(req, res) {
    try {
      console.log(req?.params?.slug);

      const data = await TextService.getOneBySlug(req?.params?.slug);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByBotID(req, res) {
    try {
      const data = await TextService.getByBotID(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new TextController();
