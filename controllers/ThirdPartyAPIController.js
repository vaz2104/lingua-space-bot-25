const ThirdPartyAPIService = require("../services/ThirdPartyAPIService");

class ThirdPartyAPIController {
  async audioToText(req, res) {
    try {
      const data = await ThirdPartyAPIService.audioToText(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new ThirdPartyAPIController();
