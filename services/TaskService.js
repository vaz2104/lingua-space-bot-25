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

  async assign(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newTaskRelation = await StudentTaskRelationship.create(options);
    let taskMeta = [];

    Promise.all(
      options?.students.map(async (studentId) => {
        const newMeta = await TaskMeta.create({
          studentId,
          taskId: options?.taskId,
        });
        taskMeta.push(newMeta);
      })
    ).then(() => {
      console.log("Task Meta Created");
    });

    return newTaskRelation;
  }

  async getByBotId(botId, adminId) {
    if (!botId || !adminId) {
      throw new Error("Invalid data was sent"); // 400
    }

    return await Task.find({ botId, adminId });
  }
  async getAssigned(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const tasks = [];
    const relations = await StudentTaskRelationship.find(options).populate([
      "taskId",
      "groupID",
      "students",
    ]);

    if (!relations) return [];

    await Promise.all(
      relations.map(async (relation) => {
        const meta = await TaskMeta.findOne({ taskId: relation?.taskId?._id });
        tasks.push({ ...relation?._doc, meta });
      })
    ).then(() => {
      console.log("Task Meta Created");
    });

    return tasks;
  }

  async getTaskByID(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const task = await Task.findById(id);

    return task;
  }

  async getTaskRelationByID(id) {
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

      // if (
      //   options?.relationOptions?.status &&
      //   options?.relationOptions?.status === "published"
      // ) {
      //   if (
      //     updatedTaskRelations?.students &&
      //     updatedTaskRelations?.students.length
      //   ) {
      //     Promise.all(
      //       updatedTaskRelations?.students.map(async (studentId) => {
      //         const newMeta = await TaskMeta.create({
      //           studentId,
      //           taskId: updatedTaskRelations?.taskId,
      //         });
      //         taskMeta.push(newMeta);
      //       })
      //     ).then(() => {
      //       console.log("Task Meta Created");
      //     });
      //   }
      // }
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

  async getSavedByBotID(options) {
    // console.log(options);

    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    return await Task.find(options).sort([["date", -1]]);
  }
  async getTaskMeta(options) {
    // console.log("getTaskMeta", options);

    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    return await TaskMeta.findOne(options);
  }
}

module.exports = new TaskService();
