const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const StudentGroupRelationshipSchema = new Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  date: {
    type: Date,
    default: new Date(dateUkrainTZ),
  },
});

module.exports = model(
  "StudentGroupRelationship",
  StudentGroupRelationshipSchema
);
