const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");
const PlatformUser = require("../models/PlatformUser");

class AdminService {
  async create(options) {
    if (!options?.username || !options?.userId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const admin = await PlatformUser.create(options);

    return admin;
  }
  async getByTelegramId(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const admin = await PlatformUser.find({
      userId: id,
    });

    return admin;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const admin = await PlatformUser.findById(id);

    return admin;
  }
  async update(options) {
    const { _id } = options;
    if (!_id) {
      throw new Error("Invalid data was sent"); // 400
    }

    options.lastActiveSession = dateUkrainTZ;

    const admin = await PlatformUser.findByIdAndUpdate(_id, options, {
      new: true,
    });

    return admin;
  }
}

module.exports = new AdminService();
