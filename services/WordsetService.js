const fetchGraphQL = require("../lib/fetchGraphQL");
const queryTotalSetsNumber = require("../queries/wordSets/queryTotalSetsNumber");
const queryWordSetBySlug = require("../queries/wordSets/queryWordSetBySlug");
const queryWordSets = require("../queries/wordSets/queryWordSets");
const queryWordSetsByBotID = require("../queries/wordSets/queryWordSetsByBotID");
const queryWordSetsByBotIDAllPages = require("../queries/wordSets/queryWordSetsByBotIDAllPages");
const queryWordSetsByBotIDCursorSelector = require("../queries/wordSets/queryWordSetsByBotIDCursorSelector");

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
  async getByBotID(id, query) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const { page, cursor } = query;
    const PER_PAGE = process.env.PER_PAGE;
    let data = null;

    if (page !== undefined) {
      const offset = page ? (page - 1) * PER_PAGE : 0;

      data = await fetchGraphQL(queryWordSetsByBotID, {
        botID: id,
        offset,
        size: parseInt(PER_PAGE),
      });
    }

    if (cursor !== undefined) {
      data = await fetchGraphQL(queryWordSetsByBotIDCursorSelector, {
        botID: id,
        cursor,
        size: parseInt(PER_PAGE),
      });
    }

    return data?.wordSets || [];
  }

  async getByBotIDFullList(id) {
    // console.log(id);

    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryWordSetsByBotIDAllPages, {
      botID: id,
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
