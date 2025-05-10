const Lesson = require("../models/Lesson");
const StudentLessonRelationship = require("../models/StudentLessonRelationship");

class LessonService {
  async create(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newLesson = await Lesson.create(options);

    return newLesson;
  }
  async assign(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newLessonRelation = await StudentLessonRelationship.create(options);

    return newLessonRelation;
  }
  async getMany(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const lessons = await Lesson.find(options);

    return lessons;
  }

  async getByID(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const lesson = await Lesson.findById(id).populate(["selectedTasks"]);

    return lesson;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    return await Lesson.findByIdAndDelete(id);
  }

  async update(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }
    let updatedLesson = null;
    if (options?.id && options?.lessonOptions) {
      updatedLesson = await Lesson.findByIdAndUpdate(
        options?.id,
        options.lessonOptions,
        {
          new: true,
        }
      );
    }

    return updatedLesson;
  }
}

module.exports = new LessonService();
