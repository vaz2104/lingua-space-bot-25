const Course = require("../models/Course");
const CourseRelationMeta = require("../models/CourseRelationMeta");
const StudentCourseRelationship = require("../models/StudentCourseRelationship");

class CourseService {
  /**
   * LESSON METHODS
   */

  async CourseCreate(options) {
    if (!options) {
      throw new Error("CourseCreate -> Invalid data was sent");
    }

    options.createdAt = `${formatDate(new Date())}T00:00:00.000Z`;
    options.timestamp = Date.now();

    return await Course.create(options);
  }
  async CourseGetMany(options) {
    if (!options) {
      throw new Error("CourseGetMany -> Invalid data was sent");
    }

    return await Course.find(options)
      .populate(["selectedLessons"])
      .sort([["timestamp", -1]]);
  }
  async CourseGetSingle(id) {
    if (!id) {
      throw new Error("CourseGetSingle -> Invalid data was sent");
    }

    return await Course.findById(id).populate(["selectedLessons"]);
  }
  async CourseDelete(id) {
    if (!id) {
      throw new Error("CourseDelete -> Invalid data was sent");
    }

    return await Course.findByIdAndDelete(id);
  }
  async CourseUpdate(id, options) {
    if (!id || !options) {
      throw new Error("CourseUpdate -> Invalid data was sent");
    }

    return await Course.findByIdAndUpdate(id, options, {
      new: true,
    });
  }

  /**
   * LESSON RELATION METHODS
   */

  async CourseRelationCreate(options) {
    if (!options) {
      throw new Error("CourseRelationCreate -> Invalid data was sent");
    }

    options.createdAt = `${formatDate(new Date())}T00:00:00.000Z`;
    options.timestamp = Date.now();

    const newCourseRelation = await StudentCourseRelationship.create(options);

    if (newCourseRelation?.students && newCourseRelation?.students?.length) {
      await Promise.all(
        newCourseRelation?.students.map(async (studentId) => {
          await this.RelationMetaCreate({
            studentId,
            courseRelationId: newCourseRelation?._id,
          });
        })
      ).then(() => {
        console.log("RelationMetaCreate finished");
      });
    }

    return newCourseRelation;
  }

  async CourseRelationGetMany(options) {
    if (!options) {
      throw new Error("CourseRelationGetMany -> Invalid data was sent");
    }

    const courses = [];
    const relations = await StudentCourseRelationship.find(options)
      .populate(["courseId", "groupID", "students"])
      .populate({
        path: "courseId",
        populate: [
          {
            path: "selectedLessons",
            model: "Lesson",
          },
        ],
      })
      .sort([["timestamp", -1]]);

    if (!relations) return null;

    await Promise.all(
      relations.map(async (relation) => {
        const meta = await this.RelationMetaGetSingle(relation?._id);
        courses.push({ ...relation?._doc, meta });
      })
    ).then(() => {
      console.log("RelationMetaGetSingle selected");
    });

    return courses;
  }
  async CourseRelationGetSingle(id) {
    if (!id) {
      throw new Error("CourseRelationGetSingle -> Invalid data was sent");
    }

    const relation = await StudentCourseRelationship.findById(id)
      .populate(["courseId", "groupID", "students"])
      .populate({
        path: "courseId",
        populate: [
          {
            path: "selectedLessons",
            model: "Lesson",
          },
        ],
      });

    if (!relation?._id) return null;

    const meta = await this.RelationMetaGetSingle(relation?._id);

    return { ...relation?._doc, meta };
  }
  async CourseRelationDelete(id) {
    if (!id) {
      throw new Error("CourseRelationDelete -> Invalid data was sent");
    }

    return await StudentCourseRelationship.findByIdAndDelete(id);
  }
  async CourseRelationUpdate(id, options) {
    if (!id || !options) {
      throw new Error("CourseRelationUpdate -> Invalid data was sent");
    }

    return await StudentCourseRelationship.findByIdAndUpdate(id, options, {
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

    options.createdAt = `${formatDate(new Date())}T00:00:00.000Z`;
    options.timestamp = Date.now();

    return await CourseRelationMeta.create(options);
  }
  async RelationMetaGetMany(options) {
    if (!options) {
      throw new Error("RelationMetaGetMany -> Invalid data was sent");
    }

    return await CourseRelationMeta.find(options).sort([["timestamp", -1]]);
  }
  async RelationMetaGetSingle(id) {
    if (!id) {
      throw new Error("RelationMetaGetSingle -> Invalid data was sent");
    }

    return await CourseRelationMeta.findOne({ courseRelationId: id });
  }
  async RelationMetaDelete(id) {
    if (!id) {
      throw new Error("RelationMetaDelete -> Invalid data was sent");
    }

    return await CourseRelationMeta.findByIdAndDelete(id);
  }
  async RelationMetaUpdate(id, options) {
    if (!id || !options) {
      throw new Error("RelationMetaUpdate -> Invalid data was sent");
    }

    return await CourseRelationMeta.findByIdAndUpdate(id, options, {
      new: true,
    });
  }
}

module.exports = new CourseService();
