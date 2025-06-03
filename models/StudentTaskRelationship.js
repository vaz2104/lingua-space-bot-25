const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const StudentTaskRelationshipSchema = new Schema({
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
  taskId: {
    type: Schema.Types.ObjectId,
    ref: "Task",
  },
  status: {
    type: String,
    default: "published", // inactive | finished
  },
  type: {
    type: String,
    default: "", // single | lesson
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
  "StudentTaskRelationship",
  StudentTaskRelationshipSchema
);
