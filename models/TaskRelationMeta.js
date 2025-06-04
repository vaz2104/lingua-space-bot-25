const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const TaskRelationMetaSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  relationId: {
    type: Schema.Types.ObjectId,
    ref: "StudentTaskRelationship",
  },
  activeExercise: {
    type: String,
    default: "",
  },
  meta: {
    type: String,
    default: "",
  },
  status: {
    type: String, //
    default: "inactive", // active | finished
  },
  type: {
    type: String,
    default: "", // single | lesson
  },
  createdAt: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("TaskRelationMeta", TaskRelationMetaSchema);
