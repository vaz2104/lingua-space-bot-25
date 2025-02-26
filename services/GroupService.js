const Group = require("../models/Group");
const StudentGroupRelationship = require("../models/StudentGroupRelationship");

class GroupService {
  async create(options) {
    if (!options?.adminId || !options?.name || !options?.botId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const group = await Group.create(options);
    return group;
  }
  async getAll(options) {
    const { botId, adminId } = options;

    if (!adminId || !botId) {
      throw new Error("Invalid data was sent"); // 400
    }

    const groups = await Group.find({
      adminId,
      botId,
    }).sort([["dateRegistration", -1]]);

    return groups;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const group = await Group.findById(id);
    const students = await StudentGroupRelationship.find({
      groupId: id,
    }).populate("studentId");

    return { group, students };
  }
  async update(options) {
    const { _id, name } = options;
    if (!_id || !name) {
      throw new Error("Invalid data was sent"); // 400
    }

    const group = await Group.findByIdAndUpdate(_id, options, {
      new: true,
    });

    return group;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const group = await Group.findByIdAndDelete(id);

    return group;
  }
  async getStudents(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const students = await StudentBotRelationship.find({
      botId: id,
    }).populate(["studentId"]);

    return students;
  }
  async addStudent(options) {
    if (!options?.groupId || !options?.studentId) {
      throw new Error("Invalid data was sent"); // 400
    }

    if (Array.isArray(options?.studentId)) {
      const relations = [];
      return Promise.all(
        options?.studentId.map(async (studentId) => {
          const newRelation = await StudentGroupRelationship.create({
            groupId: options?.groupId,
            studentId: studentId,
          });
          relations.push(newRelation);
        })
      ).then(() => {
        return relations;
      });
    } else {
      const relation = await StudentGroupRelationship.create(options);
      return relation;
    }
  }

  async deleteStudent(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const relation = await StudentGroupRelationship.findByIdAndDelete(id);

    return relation;
  }
}

module.exports = new GroupService();
