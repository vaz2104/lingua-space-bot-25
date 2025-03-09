const PhrasebookService = require("../services/PhrasebookService");

class PhrasebookController {
  async getAll(req, res) {
    try {
      const data = await PhrasebookService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getSingleBy(req, res) {
    try {
      const data = await PhrasebookService.getSingleBy(
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
      const data = await PhrasebookService.getNameByID(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getByBotID(req, res) {
    try {
      const data = await PhrasebookService.getByBotID(
        req?.params?.id,
        req?.query
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getTotalSetsNumber(req, res) {
    try {
      const data = await PhrasebookService.getTotalSetsNumber(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new PhrasebookController();
