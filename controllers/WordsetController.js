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
  async getSingleBy(req, res) {
    try {
      const data = await WordsetService.getOneBySlug(
        req?.params?.id,
        req?.query?.idType
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getNameByID(req, res) {
    try {
      const data = await WordsetService.getNameByID(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getByBotID(req, res) {
    try {
      const data = await WordsetService.getByBotID(req?.params?.id, req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByBotIDFullList(req, res) {
    try {
      const data = await WordsetService.getByBotIDFullList(req?.params?.id);
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
