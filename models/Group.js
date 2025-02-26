const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const GroupSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  name: {
    type: String,
    default: "",
  },
  dateRegistration: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
});

module.exports = model("Group", GroupSchema);
