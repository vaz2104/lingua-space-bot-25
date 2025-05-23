const { Schema, model } = require("mongoose");

const LessonRelationMetaSchema = new Schema({
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
  dateStart: {
    type: Date,
    // default: new Date(dateUkrainTZ),
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("LessonRelationMeta", LessonRelationMetaSchema);
