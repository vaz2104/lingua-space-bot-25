const Bot = require("../models/Bot");
const StudentBotRelationship = require("../models/StudentBotRelationship");
const TelegramBot = require("node-telegram-bot-api");
const TeacherAdminRelationship = require("../models/TeacherAdminRelationship");

class BotService {
  async create(options) {
    if (!options?.adminId || !options?.token) {
      throw new Error("Invalid data was sent"); // 400
    }

    const bot = await Bot.create(options);
    return bot;
  }
  async getAll(adminId) {
    // console.log(adminId);

    if (!adminId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const bots = await Bot.find({
      adminId,
    });

    const botsData = [];

    for (let item = 0; item < bots.length; item++) {
      const botItem = bots[item];

      let bot = new TelegramBot(botItem.token, {
        polling: false,
      });

      if (!bot) return [];

      const data = await bot.getMe();
      const avatars = await bot.getUserProfilePhotos(data?.id);

      if (avatars?.photos[0]) {
        data.avatar = await bot.getFileLink(avatars?.photos[0][0]?.file_id);
      }

      botsData.push({ _id: botItem._id, ...data });
    }

    return botsData;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const botData = await Bot.findById(id);
    let bot = new TelegramBot(botData.token, {
      polling: false,
    });

    if (!bot) return [];

    const telegramData = await bot.getMe();

    return { botData, telegramData };
  }
  async update(options) {
    const { _id } = options;
    if (!_id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const bot = await Bot.findByIdAndUpdate(_id, options, {
      new: true,
    });

    return bot;
  }
  async getTeacherAll(teacherId) {
    if (!teacherId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const bots = await TeacherAdminRelationship.find({
      teacherId,
    });

    const botsData = [];

    return bots;

    for (let item = 0; item < bots.length; item++) {
      const botItem = bots[item];

      let bot = new TelegramBot(botItem.token, {
        polling: false,
      });

      if (!bot) return [];

      const data = await bot.getMe();
      const avatars = await bot.getUserProfilePhotos(data?.id);

      if (avatars?.photos[0]) {
        data.avatar = await bot.getFileLink(avatars?.photos[0][0]?.file_id);
      }

      botsData.push({ _id: botItem._id, ...data });
    }

    return botsData;
  }
  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const admin = await Bot.findByIdAndDelete(id);

    return admin;
  }
  async getStudents(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const students = await StudentBotRelationship.find({
      botId: id,
    }).populate(["studentId"]);

    // console.log(students);

    return students;
  }

  async getTeachers(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const teachers = await TeacherAdminRelationship.find({
      botId: id,
    }).populate(["teacherId"]);

    return teachers;
  }

  async getInfo(options) {
    const token = options?.token;
    if (!token) {
      throw new Error("Invalid data was sent"); // 400
    }

    let bot = new TelegramBot(token, {
      polling: false,
    });

    if (!bot) return null;

    const data = await bot.getMe();
    bot = null;
    return data;
  }
}

module.exports = new BotService();
