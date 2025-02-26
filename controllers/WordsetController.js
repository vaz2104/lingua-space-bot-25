const WordsetService = require("../services/WordsetService");

class WordsetController {
  async getAll(req, res) {
    try {
      const data = await WordsetService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getBySlug(req, res) {
    try {
      console.log(req?.params?.slug);

      const data = await WordsetService.getOneBySlug(req?.params?.slug);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByBotID(req, res) {
    try {
      const data = await WordsetService.getByBotID(
        req?.params?.id,
        req?.query?.page
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getTotalSetsNumber(req, res) {
    try {
      const data = await WordsetService.getTotalSetsNumber(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new WordsetController();
