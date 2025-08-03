const PlatformUser = require("../models/PlatformUser");
const StudentBotRelationship = require("../models/StudentBotRelationship");
const TelegramUserService = require("../services/TelegramUserService");
const BotCallbacks = require("./BotCallbacks");
const PanelCallbacks = require("./PanelCallbacks");

class PanelMethods {
  async initCommand(bot, botId) {
    bot.on("message", async (msg) => {
      // const { id: chatId } = msg.from;
      console.log(msg);

      return false;
    });

    // forward_from_chat: {
    // id: -1001977206005,
    // title: 'LinguaSpace | English',

    bot.onText(/\/start/, async function (msg) {
      const { id: userId, username, first_name: firstName } = msg.from;

      console.log(userId, msg?.text);

      const textParts = msg?.text.split(" ");
      // console.log(`callback_query=>${textParts.length}`);

      let telegramUser = await TelegramUserService.telegramId(userId);
      let newUser = false;

      try {
        await bot.sendChatAction(userId, "typing");

        if (!telegramUser) {
          console.log("no telegram user");

          const newUserOptions = {
            username: username || firstName || "",
            userId,
            firstName,
          };

          console.log(newUserOptions);

          const avatars = await bot.getUserProfilePhotos(userId);

          if (avatars?.photos[0]) {
            newUserOptions.photoUrl = await bot.getFileLink(
              avatars?.photos[0][0]?.file_id
            );
          }

          telegramUser = await TelegramUserService.create(newUserOptions);
        }

        console.log("active telegram user");

        let isUserStudent = await PlatformUser.find({
          telegramUserId: telegramUser?._id,
          role: "student",
        });

        if (!isUserStudent.length) {
          console.log("telegram user is not a student");
          await PlatformUser.create({
            telegramUserId: telegramUser?._id,
            role: "student",
          });
        }
        console.log("telegram user is a student");

        const hasStudentRelationship = await StudentBotRelationship.find({
          botId,
          studentId: telegramUser?._id,
        });

        if (!hasStudentRelationship.length) {
          console.log("telegram user has no relationship");
          await StudentBotRelationship.create({
            botId,
            studentId: telegramUser?._id,
          });
          newUser = true;
        }

        console.log("telegram user has relationship");

        // await bot.sendMessage(
        //   userId,
        //   !newUser
        //     ? `Привіт ${
        //         username ? `@${username}` : `<b>${firstName}</b>`
        //       }!\nРаді знову бачити!`
        //     : `Привіт ${
        //         username ? `@${username}` : `<b>${firstName}</b>`
        //       }!\nВітаємо в <b>LinguaSpace</b>`,
        //   {
        //     parse_mode: "HTML",
        //     reply_markup: {
        //       inline_keyboard: [
        //         // [
        //         //   {
        //         //     text: "Запустити додаток",
        //         //     web_app: { url: "https://lingua-app-eta.vercel.app" },
        //         //   },
        //         // ],
        //         // [
        //         //   {
        //         //     text: "Дані для входу в платформу",
        //         //     callback_data: "generateAuthData",
        //         //   },
        //         // ],
        //       ],
        //       one_time_keyboard: true,
        //     },
        //   }
        // );

        if (newUser) {
          await bot.sendMessage(
            userId,
            `Привіт ${
              username ? `@${username}` : `<b>${firstName}</b>`
            }!\nВітаємо в <b>LinguaSpace</b>`,
            {
              parse_mode: "HTML",
            }
          );
        } else {
          if (!textParts[1]) {
            await bot.sendMessage(
              userId,
              `Привіт ${
                username ? `@${username}` : `<b>${firstName}</b>`
              }!\nРаді знову бачити!`,
              {
                parse_mode: "HTML",
              }
            );
          }
        }

        if (textParts[1]) {
          const queryParts = textParts[1].split("-");

          console.log(queryParts);

          switch (queryParts[0]) {
            case "startTask":
              const options = {
                botId: queryParts[1],
                userId: telegramUser?._id,
                taskId: queryParts[2],
              };
              await PanelCallbacks.assignTask(bot, msg.from, options);
              break;
          }
        }

        return false;
      } catch (error) {
        console.log(error);

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
