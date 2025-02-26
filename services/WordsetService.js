const fetchGraphQL = require("../lib/fetchGraphQL");
const queryTotalSetsNumber = require("../queries/wordSets/queryTotalSetsNumber");
const queryWordSetBySlug = require("../queries/wordSets/queryWordSetBySlug");
const queryWordSets = require("../queries/wordSets/queryWordSets");
const queryWordSetsByBotID = require("../queries/wordSets/queryWordSetsByBotID");

class WordsetService {
  async getAll() {
    const data = await fetchGraphQL(queryWordSets, {});

    return data?.wordSets?.nodes || [];
  }
  async getOneBySlug(slug) {
    if (!slug) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryWordSetBySlug, { slug });

    return data?.wordSet || [];
  }
  async getByBotID(id, page) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const PER_PAGE = process.env.PER_PAGE;
    const offset = page ? (page - 1) * PER_PAGE : 0;

    const data = await fetchGraphQL(queryWordSetsByBotID, {
      botID: id,
      offset,
      size: parseInt(PER_PAGE),
    });

    // console.log(data);

    return data?.wordSets?.nodes || [];
  }

  async getTotalSetsNumber(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryTotalSetsNumber, { botID: id });

    return data?.wordSets?.pageInfo?.offsetPagination?.total || null;
  }
}

module.exports = new WordsetService();
