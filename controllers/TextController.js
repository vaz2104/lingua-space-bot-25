const TextService = require("../services/TextService");

class TextController {
  async getSingleBy(req, res) {
    try {
      // console.log(req?.params?.slug);

      const data = await TextService.getSingleBy(
        req?.params?.id,
        req?.query?.idType
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getTextsNameByID(req, res) {
    try {
      const data = await TextService.getTextsNameByID(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getByBotID(req, res) {
    try {
      const data = await TextService.getByBotID(req?.params?.id, req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getTotalSetsNumber(req, res) {
    try {
      const data = await TextService.getTotalSetsNumber(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new TextController();
