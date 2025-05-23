const TaskService = require("../services/TaskService");

class TaskController {
  async TaskCreate(req, res) {
    try {
      const data = await TaskService.TaskCreate(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async TaskGetMany(req, res) {
    try {
      const data = await TaskService.TaskGetMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async TaskGetSingle(req, res) {
    try {
      const data = await TaskService.TaskGetSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async TaskDelete(req, res) {
    try {
      const data = await TaskService.TaskDelete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async TaskUpdate(req, res) {
    try {
      const data = await TaskService.TaskUpdate(req?.params?.id, req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async TaskRelationCreate(req, res) {
    try {
      const data = await TaskService.TaskRelationCreate(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async TaskRelationGetMany(req, res) {
    try {
      const data = await TaskService.TaskRelationGetMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async TaskRelationGetSingle(req, res) {
    try {
      const data = await TaskService.TaskRelationGetSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async TaskRelationDelete(req, res) {
    try {
      const data = await TaskService.TaskRelationDelete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async TaskRelationUpdate(req, res) {
    try {
      const data = await TaskService.TaskRelationUpdate(
        req?.params?.id,
        req?.body
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaCreate(req, res) {
    try {
      const data = await TaskService.RelationMetaCreate(req?.body);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaGetMany(req, res) {
    try {
      const data = await TaskService.RelationMetaGetMany(req?.query);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaGetSingle(req, res) {
    try {
      const data = await TaskService.RelationMetaGetSingle(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaDelete(req, res) {
    try {
      const data = await TaskService.RelationMetaDelete(req?.params?.id);
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async RelationMetaUpdate(req, res) {
    try {
      const data = await TaskService.RelationMetaUpdate(
        req?.params?.id,
        req?.body
      );
      res.json(data);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new TaskController();
