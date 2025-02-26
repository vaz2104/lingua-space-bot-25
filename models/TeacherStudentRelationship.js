const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const TeacherStudentRelationshipSchema = new Schema({
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
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
  "TeacherStudentRelationship",
  TeacherStudentRelationshipSchema
);
