const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const StudentCourseRelationshipSchema = new Schema({
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
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
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
  "StudentCourseRelationship",
  StudentCourseRelationshipSchema
);
