const TelegramUserService = require("../services/TelegramUserService");
const BotCallbacks = require("./BotCallbacks");
const ExternalCommands = require("./ExternalCommands");

function checkCommand(command, bot, options) {
  const commandParts = command.split("_");
  const commandName = commandParts[0];
  const commandData = commandParts[1];

  switch (commandName) {
    case "inviteTeacher":
      ExternalCommands.inviteTeacher(commandData, bot, options);
      break;
  }
}

class BotMethods {
  async initCommand(bot) {
    bot.onText(/\/start/, async function (msg) {
      const { id: userId, username, first_name: firstName } = msg.from;
      const dataParts = msg.text.split(" ");

      console.log(msg);

      let telegramUser = await TelegramUserService.telegramId(userId);

      if (!telegramUser) {
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

      // console.log(dataParts);
      // console.log(telegramUser);

      if (dataParts.length > 1) {
        checkCommand(dataParts[1], bot, {
          telegramUserId: telegramUser._id,
          chatUserId: userId,
        });
        return;
      }

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

module.exports = new BotMethods();
