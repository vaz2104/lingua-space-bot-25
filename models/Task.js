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
  level: {
    type: String,
    default: "",
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
  isVisible: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("Task", TaskSchema);
