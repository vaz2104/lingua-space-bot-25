const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const LessonRelationMetaSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  lessonRelationId: {
    type: Schema.Types.ObjectId,
    ref: "StudentLessonRelationship",
  },
  activeTask: {
    type: Schema.Types.ObjectId,
    ref: "Task",
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
    default: "", // single | course
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

module.exports = model("LessonRelationMeta", LessonRelationMetaSchema);
