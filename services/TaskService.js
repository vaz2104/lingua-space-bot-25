const Task = require("../models/Task");
const StudentTaskRelationship = require("../models/StudentTaskRelationship");
const TaskMeta = require("../models/TaskMeta");

class TaskService {
  async create(options) {
    if (!options?.taskOptions) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newTask = await Task.create(options.taskOptions);

    let newTaskRelations = null;
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

    const relation = await StudentTaskRelationship.findById(id).populate([
      "taskId",
      "groupID",
      "students",
    ]);

    if (!relation?._id) return null;

    const meta = await TaskMeta.findOne({ taskId: relation?.taskId?._id });

    return { ...relation?._doc, meta };
  }
  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    return await StudentTaskRelationship.findByIdAndDelete(id);
  }

  async update(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }
    let updatedTask = null;
    if (options?.taskId && options?.taskOptions) {
      updatedTask = await Task.findByIdAndUpdate(
        options?.taskId,
        options.taskOptions,
        {
          new: true,
        }
      );
    }

    let updatedTaskRelations = null;
    let taskMeta = [];

    if (options?.relationId && options?.relationOptions) {
      updatedTaskRelations = await StudentTaskRelationship.findByIdAndUpdate(
        options?.relationId,
        options?.relationOptions,
        {
          new: true,
        }
      );

      if (
        options?.relationOptions?.status &&
        options?.relationOptions?.status === "published"
      ) {
        if (
          updatedTaskRelations?.students &&
          updatedTaskRelations?.students.length
        ) {
          Promise.all(
            updatedTaskRelations?.students.map(async (studentId) => {
              const newMeta = await TaskMeta.create({
                studentId,
                taskId: updatedTaskRelations?.taskId,
              });
              taskMeta.push(newMeta);
            })
          ).then(() => {
            console.log("Task Meta Created");
          });
        }
      }
    }

    return [updatedTask, updatedTaskRelations, taskMeta] || null;
  }

  async updateTaskMeta(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    // const { studentId, taskId, meta, status } = options;

    if (!options?.metaId || !options?.metaOptions) {
      return null;
    }

    return await TaskMeta.findByIdAndUpdate(
      options?.metaId,
      options?.metaOptions,
      {
        new: true,
      }
    );
  }
}

module.exports = new TaskService();
