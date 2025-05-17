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
  async assign(req, res) {
    try {
      const data = await TaskService.assign(req?.body);
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
  async getAssigned(req, res) {
    try {
      const data = await TaskService.getAssigned(req?.query);
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
  async delete(req, res) {
    try {
      const data = await TaskService.delete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async update(req, res) {
    try {
      const data = await TaskService.update(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async updateTaskMeta(req, res) {
    try {
      const data = await TaskService.updateTaskMeta(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getSavedByBotID(req, res) {
    try {
      const data = await TaskService.getSavedByBotID(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getTaskRelationByID(req, res) {
    try {
      const data = await TaskService.getTaskRelationByID(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getTaskMeta(req, res) {
    try {
      const data = await TaskService.getTaskMeta(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new TaskController();
