const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const TaskRelationMetaSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  relationId: {
    type: Schema.Types.ObjectId,
    ref: "StudentTaskRelationship",
  },
  activeExercise: {
    type: String,
    default: "",
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

module.exports = model("TaskRelationMeta", TaskRelationMetaSchema);
