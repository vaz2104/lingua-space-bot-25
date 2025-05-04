const StudentService = require("../services/StudentService");

class StudentController {
  // async create(req, res) {
  //   try {
  //     const bot = await StudentService.create(req.body);
  //     res.json(bot);
  //   } catch (error) {
  //     res.status(500).json(error.message);
  //   }
  // }
  // async getByTelegramId(req, res) {
  //   try {
  //     const bots = await StudentService.getByTelegramId(req?.params?.id);
  //     res.json(bots);
  //   } catch (error) {
  //     res.status(500).json(error.message);
  //   }
  // }

  // async update(req, res) {
  //   try {
  //     const bot = await StudentService.update(req.body);
  //     res.json(bot);
  //   } catch (error) {
  //     res.status(500).json(error.message);
  //   }
  // }

  async getTasks(req, res) {
    try {
      const data = await StudentService.getTasks(req?.params?.id, req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getOne(req, res) {
    try {
      const data = await StudentService.getOne(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getPlatformUser(req, res) {
    try {
      const data = await StudentService.getPlatformUser(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async StudentPlatformRelation(req, res) {
    try {
      const data = await StudentService.StudentPlatformRelation(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getPanels(req, res) {
    try {
      const data = await StudentService.getPanels(req?.params?.userId);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new StudentController();
