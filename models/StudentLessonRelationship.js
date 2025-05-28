const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const StudentLessonRelationshipSchema = new Schema({
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  groupID: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  },
  students: {
    type: [Schema.Types.ObjectId],
    ref: "TelegramUser",
  },
  lessonId: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
  },
  lessonType: {
    type: String,
    default: "", // single | course
  },
  courseRelationId: {
    type: Schema.Types.ObjectId,
    ref: "StudentCourseRelationship",
  },
  status: {
    type: String,
    default: "published", // inactive | finished
  },
  createdAt: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  dateFinish: {
    type: Date,
    default: "",
  },
  deadline: {
    type: Date,
    default: "",
  },
  timestamp: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = model(
  "StudentLessonRelationship",
  StudentLessonRelationshipSchema
);
