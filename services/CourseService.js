const Course = require("../models/Course");
const StudentCourseRelationship = require("../models/StudentCourseRelationship");

class CourseService {
  async create(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newCourse = await Course.create(options);

    return newCourse;
  }
  async assign(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const newCourseRelation = await StudentCourseRelationship.create(options);

    return newCourseRelation;
  }
  async getMany(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    const course = await Course.find(options);

    return course;
  }

  async getByID(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const course = await Course.findById(id).populate(["selectedLessons"]);

    return course;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    return await Course.findByIdAndDelete(id);
  }

  async update(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }
    let updatedCourse = null;
    if (options?.id && options?.courseOptions) {
      updatedCourse = await Course.findByIdAndUpdate(
        options?.id,
        options.courseOptions,
        {
          new: true,
        }
      );
    }

    return updatedCourse;
  }
  async getAssigned(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    return await StudentCourseRelationship.find(options)
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
  }
}

module.exports = new CourseService();
