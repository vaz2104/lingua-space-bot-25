const GrammarService = require("../services/GrammarService");

class GrammarController {
  async getAll(req, res) {
    try {
      const data = await GrammarService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getOneBySlug(req, res) {
    try {
      const data = await GrammarService.getOneBySlug(req?.params?.slug);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getBySlug(req, res) {
    try {
      // console.log(req?.params?.slug);

      const data = await GrammarService.getOneBySlug(req?.params?.slug);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByBotID(req, res) {
    try {
      const data = await GrammarService.getByBotID(req?.params?.id, req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getTotalSetsNumber(req, res) {
    try {
      const data = await GrammarService.getTotalSetsNumber(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new GrammarController();
