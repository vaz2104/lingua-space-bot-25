const Lesson = require("../models/Lesson");
const LessonMeta = require("../models/LessonMeta");
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

    let meta = [];

    Promise.all(
      options?.students.map(async (studentId) => {
        const newMeta = await LessonMeta.create({
          studentId,
          lessonRelationId: newLessonRelation?._id,
        });
        meta.push(newMeta);
      })
    ).then(() => {
      console.log("Task Meta Created");
    });

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

    if (options?.relationId && options?.relationOptions) {
      const updatedLessonRelations =
        await StudentLessonRelationship.findByIdAndUpdate(
          options?.relationId,
          options?.relationOptions,
          {
            new: true,
          }
        );

      const relations = await StudentLessonRelationship.findById(
        updatedLessonRelations?._id
      )
        .populate(["lessonId", "groupID", "students"])
        .populate({
          path: "lessonId",
          populate: [
            {
              path: "selectedTasks",
              model: "Task",
            },
          ],
        });

      return relations;
    }

    return updatedLesson;
  }
  async getAssigned(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relations = await StudentLessonRelationship.find(options)
      .populate(["lessonId", "groupID", "students"])
      .populate({
        path: "lessonId",
        populate: [
          {
            path: "selectedTasks",
            model: "Task",
          },
        ],
      });

    if (!relations.length) return null;

    const responseData = [];

    await Promise.all(
      relations.map(async (relation, index) => {
        const meta = await LessonMeta.findOne({
          lessonRelationId: relation?._id,
        });

        responseData.push({ ...relation?._doc, meta });
      })
    ).then(() => {
      console.log("lesson Meta selected");
    });

    return responseData;
  }

  async updateMeta(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    // const { studentId, taskId, meta, status } = options;

    if (!options?.metaId || !options?.metaOptions) {
      return null;
    }

    return await LessonMeta.findByIdAndUpdate(
      options?.metaId,
      options?.metaOptions,
      {
        new: true,
      }
    );
  }
  async getMeta(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }
    console.log(options);

    const meta = await LessonMeta.find(options);
    console.log(meta);

    return meta;
  }
}

module.exports = new LessonService();
