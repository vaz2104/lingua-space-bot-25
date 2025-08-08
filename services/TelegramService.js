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

  async PostWordQuiz(optins) {
    const { bot, word, quizType, groupID, options } = optins;
    if (!bot || !word || !quizType || !groupID || !options) {
      throw new Error("Invalid data was sent"); // 400
    }

    try {
      const botData = await Bot.findById(bot);

      if (!botData?._id) return null;

      let newBot = new TelegramBot(botData.token, {
        polling: false,
      });

      if (!newBot) return null;

      let correctOptionId = 0;
      const optionsLabels = [];

      options.forEach((node, index) => {
        optionsLabels.push(node.label);

        if (node.id === word.id) {
          correctOptionId = index;
        }
      });

      let quizTitle;
      switch (quizType) {
        case "wordTranslation":
          quizTitle = `Перекладіть на українську слово «${word.label}»`;
          break;
        case "translationWord":
          quizTitle = `Перекладіть на aнглійську слово «${word.label}»`;
          break;
        case "interpretationTranslation":
          quizTitle = `Прочитайте тлумачення нижче та спробуйте зрозуміти про яке слово йдеться мова \n\n«${word.label}»`;
          break;
      }

      return await newBot.sendPoll(groupID, quizTitle, optionsLabels, {
        type: "quiz",
        correct_option_id: correctOptionId,
        is_anonymous: true,
        // explanation: "This is an important poll about your preferences.",
        parse_mode: "HTML",
      });
    } catch (error) {
      console.log(console.log(error));
      return null;
    }
  }
}

module.exports = new TelegramService();
