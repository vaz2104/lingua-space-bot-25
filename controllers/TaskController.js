const TaskService = require("../services/TaskService");

class TaskController {
  async create(req, res) {
    try {
      const data = await TaskService.create(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getByBotId(req, res) {
    try {
      const data = await TaskService.getByBotId(
        req?.params?.id,
        req?.query?.teacher
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getAssignedByBotID(req, res) {
    try {
      const data = await TaskService.getAssignedByBotID(
        req?.params?.id,
        req?.query?.teacher
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getTaskByID(req, res) {
    try {
      const data = await TaskService.getTaskByID(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new TaskController();
