const GrammarService = require("../services/GrammarService");

class GrammarController {
  async getGrammarNameByID(req, res) {
    try {
      const data = await GrammarService.getGrammarNameByID(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getSingleBy(req, res) {
    try {
      // console.log(req?.params?.slug);

      const data = await GrammarService.getSingleBy(req?.query);
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
