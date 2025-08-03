const TelegramBot = require("node-telegram-bot-api");
const PanelCallbacks = require("../lib/PanelCallbacks");
const Bot = require("../models/Bot");

class TelegramService {
  async PostTask(options) {
    const { bot, taskId, taskType, groupID } = options;

    if (!bot || !taskId || !taskType || !groupID) {
      throw new Error("Invalid data was sent"); // 400
    }
    // console.log(options);

    const botData = await Bot.findById(options?.bot);

    if (!botData?._id) return null;

    let newBot = new TelegramBot(botData.token, {
      polling: false,
    });

    if (!newBot) return null;

    // const groupID = "-1001977206005";
    const res = await PanelCallbacks.postTask(newBot, groupID, options, bot);

    if (res.status === false) {
      return null;
    }

    return res;
  }
}

module.exports = new TelegramService();
