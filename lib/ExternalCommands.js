const Bot = require("../models/Bot");
const InviteLink = require("../models/InviteLink");
const TeacherAdminRelationship = require("../models/TeacherAdminRelationship");

class ExternalCommands {
  async inviteTeacher(commandData, bot, options) {
    // console.log(commandData, bot, options);

    if (!commandData) {
      await bot.sendMessage(
        options.chatUserId,
        `Помилка авторизації!\nБудь ласка, повторіть спробу знову`
      );
      return false;
    }

    // console.log(command);
    // console.log("create new teacher ", commandData);
    const ativeInviteSession = await InviteLink.findOne({ key: commandData });

    if (!ativeInviteSession?._id) {
      await bot.sendMessage(
        options.chatUserId,
        `Помилка авторизації!\nСхоже, Ваше посилання не активне`
      );
      return false;
    }

    const hasTeacherRelation = await TeacherAdminRelationship.findOne({
      teacherId: options.telegramUserId,
      botId: ativeInviteSession?.botId,
    });

    console.log("hasTeacherRelation", hasTeacherRelation);

    if (hasTeacherRelation) {
      await bot.sendMessage(
        options.chatUserId,
        `Ви вже приєднані до даного бота!`
      );
      return false;
    }

    const botData = Bot.findById(ativeInviteSession?.botId);

    const newTeacher = await TeacherAdminRelationship.create({
      teacherId: options.telegramUserId,
      adminId: botData?.adminId,
      botId: ativeInviteSession?.botId,
    });

    if (newTeacher) {
      await InviteLink.findByIdAndDelete(ativeInviteSession._id);
      await bot.sendMessage(
        options.chatUserId,
        `Вітаємо, Ви успішно авторизувалися!\nТепер у Вас є доступ до платформи.`,
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Увійти в платформу",
                  callback_data: "generateAuthData",
                },
              ],
            ],
            one_time_keyboard: true,
          },
        }
      );
    }
  }
}

module.exports = new ExternalCommands();
