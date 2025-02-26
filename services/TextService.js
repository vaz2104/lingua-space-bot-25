const fetchGraphQL = require("../lib/fetchGraphQL");
const queryTextBySlug = require("../queries/texts/queryTextBySlug");
const queryTextsByBotID = require("../queries/texts/queryTextsByBotID");

class TextService {
  async getOneBySlug(slug) {
    if (!slug) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryTextBySlug, { slug });

    return data?.text || [];
  }
  async getByBotID(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryTextsByBotID, { botID: id });

    return data?.texts?.nodes || [];
  }
}

module.exports = new TextService();
