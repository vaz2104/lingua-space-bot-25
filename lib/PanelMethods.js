const PlatformUser = require("../models/PlatformUser");
const StudentBotRelationship = require("../models/StudentBotRelationship");
const TelegramUserService = require("../services/TelegramUserService");
const BotCallbacks = require("./BotCallbacks");

class PanelMethods {
  async initCommand(bot, botId) {
    bot.onText(/\/start/, async function (msg) {
      const { id: userId, username, first_name: firstName } = msg.from;
      try {
        await bot.sendChatAction(userId, "typing");

        let telegramUser = await TelegramUserService.telegramId(userId);

        if (!telegramUser) {
          // console.log("no telegram user");

          const newUserOptions = {
            username,
            userId,
            firstName,
          };

          const avatars = await bot.getUserProfilePhotos(userId);

          if (avatars?.photos[0]) {
            newUserOptions.photoUrl = await bot.getFileLink(
              avatars?.photos[0][0]?.file_id
            );
          }

          telegramUser = await TelegramUserService.create(newUserOptions);
        }

        // console.log("active telegram user");

        let isUserStudent = await PlatformUser.find({
          telegramUserId: telegramUser?._id,
          role: "student",
        });

        if (!isUserStudent.length) {
          // console.log("telegram user is not a student");
          await PlatformUser.create({
            telegramUserId: telegramUser?._id,
            role: "student",
          });
        }
        // console.log("telegram user is a student");

        const hasStudentRelationship = StudentBotRelationship.find({
          botId,
          studentId: telegramUser?._id,
        });

        if (!(await hasStudentRelationship).length) {
          // console.log("telegram user has no relationship");
          await StudentBotRelationship.create({
            botId,
            studentId: telegramUser?._id,
          });
        }

        // console.log("telegram user has relationship");

        await bot.sendMessage(
          userId,
          telegramUser
            ? `Привіт @${username}!\nРаді знову бачити!`
            : `Привіт @${username}!\nВітаємо в <b>LinguaSpace</b>`,
          {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                // [
                //   {
                //     text: "Запустити додаток",
                //     web_app: { url: "https://lingua-app-eta.vercel.app" },
                //   },
                // ],
                [
                  {
                    text: "Дані для входу в платформу",
                    callback_data: "generateAuthData",
                  },
                ],
              ],
              one_time_keyboard: true,
            },
          }
        );

        return false;
      } catch (error) {
        await bot.sendMessage(
          userId,
          "Вибачте, сталася помилка! Повторіть спробу знову!"
        );
      }
    });
  }

  async callbackListener(bot) {
    bot.on("callback_query", async (callbackData) => {
      const { data } = callbackData;
      const userObject = callbackData.from;

      // userObject
      //   {
      //     id: ,
      //     is_bot: false,
      //     first_name: '',
      //     username: '',
      //     language_code: 'uk'
      //   }

      const dataParts = data.split("_");
      console.log(`callback_query => ${dataParts}`);

      switch (dataParts[0]) {
        /**************************
         **
         ***************************/
        case "generateAuthData":
          await BotCallbacks.generateAuthData(bot, userObject);
          break;
      }
    });
  }
}

module.exports = new PanelMethods();
