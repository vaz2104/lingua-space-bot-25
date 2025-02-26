class AdminController {
  async create(req, res) {
    try {
      res.json();
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByTelegramId() {
    try {
      res.json();
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getOne() {
    try {
      res.json();
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async update() {
    try {
      res.json();
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new AdminController();
