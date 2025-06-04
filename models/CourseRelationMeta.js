const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const CourseRelationMetaSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  courseRelationId: {
    type: Schema.Types.ObjectId,
    ref: "StudentCourseRelationship",
  },
  activeLesson: {
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
  createdAt: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("CourseRelationMeta", CourseRelationMetaSchema);
