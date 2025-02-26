const AdminService = require("../services/AdminService");

class AdminController {
  async create(req, res) {
    try {
      const admin = await AdminService.create(req.body);
      res.json(admin);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByTelegramId(req, res) {
    try {
      const admin = await AdminService.getByTelegramId(req?.params?.id);
      res.json(admin);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getOne(req, res) {
    try {
      const admin = await AdminService.getOne(req?.params?.id);
      res.json(admin);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const admin = await AdminService.update(req.body);
      res.json(admin);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new AdminController();
