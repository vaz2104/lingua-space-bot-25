const { Schema, model } = require("mongoose");
const dateUkrainTZ = require("../lib/getCurrentDateUkrainTimeZone");

const TaskMetaSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "TelegramUser",
  },
  taskId: {
    type: Schema.Types.ObjectId,
    ref: "Task",
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
});

module.exports = model("TaskMeta", TaskMetaSchema);
