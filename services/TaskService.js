const Task = require("../models/Task");
const StudentTaskRelationship = require("../models/StudentTaskRelationship");

class TaskService {
  async create(options) {
    if (!options?.taskOptions) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newTask = await Task.create(options.taskOptions);

    let newTaskRelations = [];
    if (
      newTask?._id &&
      options.assignToStudent &&
      options?.performers?.length
    ) {
      newTaskRelations = await StudentTaskRelationship.create({
        taskId: newTask?._id,
        botId: options?.taskOptions?.botId,
        adminId: options?.taskOptions?.adminId,
        groupID: options?.groupID,
        students: options?.performers,
      });
    }

    return [newTask, newTaskRelations] || null;
  }

  async getByBotId(botId, adminId) {
    if (!botId || !adminId) {
      throw new Error("Invalid data was sent"); // 400
    }

    return await Task.find({ botId, adminId });
  }
  async getAssignedByBotID(botId, adminId) {
    console.log(botId, adminId);

    if (!botId || !adminId) {
      throw new Error("Invalid data was sent"); // 400
    }

    return await StudentTaskRelationship.find({ botId, adminId }).populate([
      "taskId",
      "groupID",
      "students",
    ]);
  }

  async getTaskByID(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    return await StudentTaskRelationship.findById(id).populate([
      "taskId",
      "groupID",
      "students",
    ]);
  }
}

module.exports = new TaskService();
