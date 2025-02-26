const AuthService = require("../services/AuthService");
const TelegramUserService = require("../services/TelegramUserService");

class PanelCallbacks {
  async generateAuthData(bot, userObject) {
    const telegramUser = await TelegramUserService.telegramId(userObject.id);

    if (!telegramUser) {
      await bot.sendMessage(userObject.id, "Помилка авторизації", {
        parse_mode: "HTML",
      });
      return;
    }

    const authData = await AuthService.createKey({
      telegramUserId: telegramUser._id,
    });

    const message = `Ваші дані для одноразового входу:\n<b>Логін:</b> ${userObject.username}\n<b>Пароль:</b> ${authData.key}`;
    await bot.sendMessage(userObject.id, message, {
      parse_mode: "HTML",
    });
  }
}

module.exports = new PanelCallbacks();
