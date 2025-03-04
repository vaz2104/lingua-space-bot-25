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
    default: "inactive", // active | finished
  },
  dateStart: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
  dateFinish: {
    type: Date,
  },
});

module.exports = model(
  "StudentTaskRelationship",
  StudentTaskRelationshipSchema
);
