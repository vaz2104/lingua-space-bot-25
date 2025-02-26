const GroupService = require("../services/GroupService");

class GroupController {
  async create(req, res) {
    try {
      const group = await GroupService.create(req.body);
      res.json(group);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getAll(req, res) {
    try {
      const groups = await GroupService.getAll(req?.query);
      res.json(groups);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const group = await GroupService.getOne(req?.params?.id);
      res.json(group);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const group = await GroupService.update(req.body);
      res.json(group);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async delete(req, res) {
    try {
      const group = await GroupService.delete(req?.params?.id);
      res.json(group);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getStudents(req, res) {
    try {
      const group = await GroupService.getStudents(req?.params?.id);
      res.json(group);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async addStudent(req, res) {
    try {
      const group = await GroupService.addStudent(req.body);
      res.json(group);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async deleteStudent(req, res) {
    try {
      const deletedStudent = await GroupService.deleteStudent(req.query?.id);
      res.json(deletedStudent);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = new GroupController();
