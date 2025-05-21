const Course = require("../models/Course");
const CourseMeta = require("../models/CourseMeta");
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

    let meta = [];

    Promise.all(
      options?.students.map(async (studentId) => {
        const newMeta = await CourseMeta.create({
          studentId,
          courseRelationId: newCourseRelation?._id,
        });
        meta.push(newMeta);
      })
    ).then(() => {
      console.log("Task Meta Created");
    });

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

    if (options?.relationId && options?.relationOptions) {
      const updatedCourseRelations =
        await StudentCourseRelationship.findByIdAndUpdate(
          options?.relationId,
          options?.relationOptions,
          {
            new: true,
          }
        );

      const relations = await StudentCourseRelationship.findById(
        updatedCourseRelations?._id
      )
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

      return relations;
    }

    return updatedCourse;
  }
  async getAssigned(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

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
      });

    if (!relations.length) return null;

    const responseData = [];

    await Promise.all(
      relations.map(async (relation, index) => {
        const meta = await CourseMeta.findOne({
          courseRelationId: relation?._id,
        });

        responseData.push({ ...relation?._doc, meta });
      })
    ).then(() => {
      console.log("course meta selected");
    });

    return responseData;
  }
  async updateMeta(options) {
    if (!options) {
      throw new Error("Invalid data was sent"); // 400
    }

    if (!options?.metaId || !options?.metaOptions) {
      return null;
    }

    return await CourseMeta.findByIdAndUpdate(
      options?.metaId,
      options?.metaOptions,
      {
        new: true,
      }
    );
  }
}

module.exports = new CourseService();
