const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const TaskSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  matherialType: {
    type: String,
    default: "",
  },
  selectedObject: {
    type: String,
    default: "",
  },
  selectedItems: {
    type: [String],
    default: [],
  },
  selectedExercises: {
    type: [String],
    default: [],
  },
  saveToCalatog: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
});

module.exports = model("Task", TaskSchema);
