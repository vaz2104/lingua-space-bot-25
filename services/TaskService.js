const Task = require("../models/Task");
const StudentTaskRelationship = require("../models/StudentTaskRelationship");
const TaskRelationMeta = require("../models/TaskRelationMeta");
const formatDate = require("../lib/formatDate");

class TaskService {
  /**
   * TASK METHODS
   */

  async TaskCreate(options) {
    if (!options) {
      options.createdAt = `${formatDate(new Date())}T00:00:00.000Z`;
      options.timestamp = Date.now();

      throw new Error("TaskCreate -> Invalid data was sent");
    }

    return await Task.create(options);
  }
  async TaskGetMany(options) {
    if (!options) {
      throw new Error("TaskGetMany -> Invalid data was sent");
    }

    return await Task.find(options).sort([["timestamp", -1]]);
  }
  async TaskGetSingle(id) {
    if (!id) {
      throw new Error("TaskGetSingle -> Invalid data was sent");
    }

    return await Task.findById(id);
  }
  async TaskDelete(id) {
    if (!id) {
      throw new Error("TaskDelete -> Invalid data was sent");
    }

    return await Task.findByIdAndDelete(id);
  }
  async TaskUpdate(id, options) {
    if (!id || !options) {
      throw new Error("TaskUpdate -> Invalid data was sent");
    }

    return await Task.findByIdAndUpdate(id, options, {
      new: true,
    });
  }

  /**
   * TASK RELATION METHODS
   */

  async TaskRelationCreate(options) {
    if (!options) {
      throw new Error("TaskRelationCreate -> Invalid data was sent");
    }

    options.createdAt = `${formatDate(new Date())}T00:00:00.000Z`;
    options.timestamp = Date.now();

    const newTaskRelation = await StudentTaskRelationship.create(options);

    if (newTaskRelation?.students && newTaskRelation?.students?.length) {
      await Promise.all(
        newTaskRelation?.students.map(async (studentId) => {
          await this.RelationMetaCreate({
            botId: options?.botId,
            studentId,
            relationId: newTaskRelation?._id,
            type: options?.type,
          });
        })
      ).then(() => {
        console.log("RelationMetaCreate finished");
      });
    }

    return newTaskRelation;
  }

  async TaskRelationGetMany(options) {
    if (!options) {
      throw new Error("TaskRelationGetMany -> Invalid data was sent");
    }

    const tasks = [];

    const relations = await StudentTaskRelationship.find(options)
      .populate(["taskId", "groupID", "students"])
      .sort([["timestamp", -1]]);

    if (!relations) return null;

    await Promise.all(
      relations.map(async (relation) => {
        let metaQuery = {
          relationId: relation?._id,
        };

        if (options.students) {
          metaQuery.studentId = options.students;
        }

        const meta = await this.RelationMetaGetMany(metaQuery);

        tasks.push({ ...relation?._doc, meta });
      })
    ).then(() => {
      console.log("RelationMetaGetSingle selected");
    });

    return tasks;
  }
  async TaskRelationGetSingle(id) {
    if (!id) {
      throw new Error("TaskRelationGetSingle -> Invalid data was sent");
    }

    const relation = await StudentTaskRelationship.findById(id).populate([
      "taskId",
      "groupID",
      "students",
    ]);

    if (!relation?._id) return null;

    const meta = await this.RelationMetaGetMany({
      relationId: relation?._id,
    });

    return { ...relation?._doc, meta };
  }
  async TaskRelationDelete(id) {
    if (!id) {
      throw new Error("TaskRelationDelete -> Invalid data was sent");
    }

    return await StudentTaskRelationship.findByIdAndDelete(id);
  }
  async TaskRelationUpdate(id, options) {
    if (!id || !options) {
      throw new Error("TaskRelationUpdate -> Invalid data was sent");
    }

    return await StudentTaskRelationship.findByIdAndUpdate(id, options, {
      new: true,
    });
  }

  /**
   * TASK RELATION META METHODS
   */

  async RelationMetaCreate(options) {
    if (!options) {
      throw new Error("RelationMetaCreate -> Invalid data was sent");
    }

    options.createdAt = `${formatDate(new Date())}T00:00:00.000Z`;
    options.timestamp = Date.now();

    return await TaskRelationMeta.create(options);
  }
  async RelationMetaGetMany(options) {
    if (!options) {
      throw new Error("RelationMetaGetMany -> Invalid data was sent");
    }

    return await TaskRelationMeta.find(options)
      .populate(["relationId", "studentId"])
      .populate({
        path: "relationId",
        populate: [
          {
            path: "taskId",
            model: "Task",
          },
        ],
      })
      .sort([["timestamp", -1]]);
  }
  async RelationMetaGetSingle(id) {
    if (!id) {
      throw new Error("RelationMetaGetSingle -> Invalid data was sent");
    }

    return await TaskRelationMeta.findById(id)
      .populate(["relationId", "studentId"])
      .populate({
        path: "relationId",
        populate: [
          {
            path: "taskId",
            model: "Task",
          },
        ],
      });
  }
  async RelationMetaDelete(id) {
    if (!id) {
      throw new Error("RelationMetaDelete -> Invalid data was sent");
    }

    return await TaskRelationMeta.findByIdAndDelete(id);
  }
  async RelationMetaUpdate(id, options) {
    if (!id || !options) {
      throw new Error("RelationMetaUpdate -> Invalid data was sent");
    }

    return await TaskRelationMeta.findByIdAndUpdate(id, options, {
      new: true,
    });
  }
}

module.exports = new TaskService();
