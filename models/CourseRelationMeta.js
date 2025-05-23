const { Schema, model } = require("mongoose");

const CourseRelationMetaSchema = new Schema({
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
  dateStart: {
    type: Date,
    // default: new Date(dateUkrainTZ),
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model("CourseRelationMeta", CourseRelationMetaSchema);
