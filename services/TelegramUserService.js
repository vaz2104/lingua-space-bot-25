const TelegramUser = require("../models/TelegramUser");

class TelegramUserService {
  async create(options) {
    if (!options?.userId || !options?.username) {
      throw new Error("Invalid data was sent"); // 400
    }

    const telegramUser = await TelegramUser.create(options);
    return telegramUser;
  }
  async telegramUsername(username) {
    if (!username) {
      throw new Error("Invalid data was sent"); // 400
    }

    const telegramUser = await TelegramUser.findOne({
      username,
    });

    return telegramUser;
  }
  async telegramId(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const telegramUser = await TelegramUser.findOne({
      userId: id,
    });

    return telegramUser;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const telegramUser = await TelegramUser.findById(id);

    return telegramUser;
  }
  async update(options) {
    const { _id } = options;
    if (!_id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const telegramUser = await TelegramUser.findByIdAndUpdate(_id, options, {
      new: true,
    });

    return telegramUser;
  }
  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const telegramUser = await TelegramUser.findByIdAndDelete(id);

    return telegramUser;
  }
}

module.exports = new TelegramUserService();
