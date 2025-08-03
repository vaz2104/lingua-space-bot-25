// const Student = require("../models/Student");

const PlatformUser = require("../models/PlatformUser");
const StudentBotRelationship = require("../models/StudentBotRelationship");
const StudentTaskRelationship = require("../models/StudentTaskRelationship");
const TelegramUser = require("../models/TelegramUser");

class StudentService {
  async getTasks(studentId, options) {
    if (!studentId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const status = options?.status ? options?.status.split(",") : [];
    console.log(status);

    const tasksRelations = await StudentTaskRelationship.find({
      students: studentId,
      botId: options?.botId,
      status: { $in: status },
    }).populate(["taskId", "groupID", "students"]);

    return tasksRelations;
  }

  async getOne(options) {
    const search = options?.username ? options : {};
    console.log("options", options);

    const telegramUser = await TelegramUser.findOne(search, ["_id"]);

    console.log("telegramUser", telegramUser);

    if (!telegramUser?._id) return null;

    return telegramUser;
  }

  async getPlatformUser(options) {
    if (!options?.telegramUserId || !options?.role) {
      throw new Error("Invalid data was sent"); // 400
    }

    const userRole = await PlatformUser.findOne(options, ["_id"]);

    if (!userRole?._id) return null;

    return userRole;
  }

  async StudentPlatformRelation(options) {
    if (!options?.studentId || !options?.botId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await StudentBotRelationship.findOne(options, ["_id"]);

    if (!relation?._id) return null;

    return relation;
  }
  async getPanels(userId) {
    if (!userId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await StudentBotRelationship.find({ studentId: userId }, [
      "botId",
    ]);

    return relation;
  }
}

module.exports = new StudentService();
