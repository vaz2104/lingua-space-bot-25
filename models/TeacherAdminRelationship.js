const { Schema, model } = require("mongoose");

const TeacherAdminRelationshipSchema = new Schema({
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  botId: {
    type: Schema.Types.ObjectId,
    ref: "Bot",
  },
});

module.exports = model(
  "TeacherAdminRelationship",
  TeacherAdminRelationshipSchema
);
