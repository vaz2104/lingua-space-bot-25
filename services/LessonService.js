const Lesson = require("../models/Lesson");
const LessonRelationMeta = require("../models/LessonRelationMeta");
const StudentLessonRelationship = require("../models/StudentLessonRelationship");

class LessonService {
  /**
   * LESSON METHODS
   */

  async LessonCreate(options) {
    if (!options) {
      throw new Error("LessonCreate -> Invalid data was sent");
    }

    return await Lesson.create(options);
  }
  async LessonGetMany(options) {
    if (!options) {
      throw new Error("LessonGetMany -> Invalid data was sent");
    }

    return await Lesson.find(options)
      .populate(["selectedTasks"])
      .sort([["timestamp", -1]]);
  }
  async LessonGetSingle(id) {
    if (!id) {
      throw new Error("LessonGetSingle -> Invalid data was sent");
    }

    return await Lesson.findById(id).populate(["selectedTasks"]);
  }
  async LessonDelete(id) {
    if (!id) {
      throw new Error("LessonDelete -> Invalid data was sent");
    }

    return await Lesson.findByIdAndDelete(id);
  }
  async LessonUpdate(id, options) {
    if (!id || !options) {
      throw new Error("LessonUpdate -> Invalid data was sent");
    }

    return await Lesson.findByIdAndUpdate(id, options, {
      new: true,
    });
  }

  /**
   * LESSON RELATION METHODS
   */

  async LessonRelationCreate(options) {
    if (!options) {
      throw new Error("LessonRelationCreate -> Invalid data was sent");
    }

    const newLessonRelation = await StudentLessonRelationship.create(options);

    if (newLessonRelation?.students && newLessonRelation?.students?.length) {
      await Promise.all(
        newLessonRelation?.students.map(async (studentId) => {
          await this.RelationMetaCreate({
            studentId,
            lessonRelationId: newLessonRelation?._id,
          });
        })
      ).then(() => {
        console.log("RelationMetaCreate finished");
      });
    }

    return newLessonRelation;
  }

  async LessonRelationGetMany(options) {
    if (!options) {
      throw new Error("LessonRelationGetMany -> Invalid data was sent");
    }

    const lessons = [];
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
      })
      .sort([["timestamp", -1]]);

    if (!relations) return null;

    await Promise.all(
      relations.map(async (relation) => {
        const meta = await this.RelationMetaGetSingle(relation?._id);
        lessons.push({ ...relation?._doc, meta });
      })
    ).then(() => {
      console.log("RelationMetaGetSingle selected");
    });

    return lessons;
  }
  async LessonRelationGetSingle(id) {
    if (!id) {
      throw new Error("LessonRelationGetSingle -> Invalid data was sent");
    }

    const relation = await StudentLessonRelationship.findById(id)
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

    if (!relation?._id) return null;

    const meta = await this.RelationMetaGetSingle(relation?._id);

    return { ...relation?._doc, meta };
  }
  async LessonRelationDelete(id) {
    if (!id) {
      throw new Error("LessonRelationDelete -> Invalid data was sent");
    }

    return await StudentLessonRelationship.findByIdAndDelete(id);
  }
  async LessonRelationUpdate(id, options) {
    if (!id || !options) {
      throw new Error("LessonRelationUpdate -> Invalid data was sent");
    }

    return await StudentLessonRelationship.findByIdAndUpdate(id, options, {
      new: true,
    });
  }

  /**
   * LESSON RELATION META METHODS
   */

  async RelationMetaCreate(options) {
    if (!options) {
      throw new Error("RelationMetaCreate -> Invalid data was sent");
    }

    return await LessonRelationMeta.create(options);
  }
  async RelationMetaGetMany(options) {
    if (!options) {
      throw new Error("RelationMetaGetMany -> Invalid data was sent");
    }

    return await LessonRelationMeta.find(options).sort([["timestamp", -1]]);
  }
  async RelationMetaGetSingle(id) {
    if (!id) {
      throw new Error("RelationMetaGetSingle -> Invalid data was sent");
    }

    return await LessonRelationMeta.findOne({ lessonRelationId: id });
  }
  async RelationMetaDelete(id) {
    if (!id) {
      throw new Error("RelationMetaDelete -> Invalid data was sent");
    }

    return await LessonRelationMeta.findByIdAndDelete(id);
  }
  async RelationMetaUpdate(id, options) {
    if (!id || !options) {
      throw new Error("RelationMetaUpdate -> Invalid data was sent");
    }

    return await LessonRelationMeta.findByIdAndUpdate(id, options, {
      new: true,
    });
  }
}

module.exports = new LessonService();
