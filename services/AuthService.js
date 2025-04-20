const generateRandomKey = require("../lib/generateRandomKey");
const Auth = require("../models/Auth");
const InviteLink = require("../models/InviteLink");
const PlatformUser = require("../models/PlatformUser");
const TelegramUserService = require("./TelegramUserService");

class AuthService {
  async createKey(options) {
    // console.log(options);

    if (!options?.telegramUserId) {
      throw new Error("Invalid data was sent"); // 400
    }
    await Auth.deleteMany({ telegramUserId: options?.telegramUserId });

    options.key = generateRandomKey(5, true);
    const authData = await Auth.create(options);

    return authData;
  }
  async deleteKey(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const authData = await Auth.findByIdAndDelete(id);

    return authData;
  }
  async login(options) {
    if (!options?.username || !options.key) {
      throw new Error("Invalid data was sent"); // 400
    }

    const telegramUser = await TelegramUserService.telegramUsername(
      options?.username
    );

    if (!telegramUser) return null;

    const platformUser = await PlatformUser.findOne({
      telegramUserId: telegramUser._id,
      role: options.role,
    });

    if (!platformUser) return null;

    const authData = await Auth.findOne({
      telegramUserId: telegramUser._id,
      key: options.key,
    });

    if (!authData) return null;

    await Auth.deleteMany({ telegramUserId: telegramUser._id });

    return { ...telegramUser?._doc, role: options.role };
  }

  async createInviteLink(botId) {
    const options = { botId };
    options.key = generateRandomKey(16, true);
    const authData = await InviteLink.create(options);
    return authData;
  }
  async deleteInviteLink(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const authData = await InviteLink.findByIdAndDelete(id);
    return authData;
  }
}

module.exports = new AuthService();
