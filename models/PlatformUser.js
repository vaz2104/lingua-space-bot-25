const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const PlatformUserSchema = new Schema({
  telegramUserId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  role: {
    type: String,
    default: "", // teacher | admin | student
  },
  dateRegistration: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
});

module.exports = model("PlatformUser", PlatformUserSchema);
