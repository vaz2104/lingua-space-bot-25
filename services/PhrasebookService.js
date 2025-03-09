const fetchGraphQL = require("../lib/fetchGraphQL");
const queryPhrasebooksBySlug = require("../queries/phrasebooks/queryPhrasebooksBySlug");
const queryPhrasebooksByID = require("../queries/phrasebooks/queryPhrasebooksByID");
const queryPhrasebooksNameByID = require("../queries/phrasebooks/queryPhrasebooksNameByID");
const queryPhrasebooks = require("../queries/phrasebooks/queryPhrasebooks");
const queryPhrasebooksByBotID = require("../queries/phrasebooks/queryPhrasebooksByBotID");
const queryPhrasebooksByBotIDCursorSelector = require("../queries/phrasebooks/queryPhrasebooksByBotIDCursorSelector");
const queryTotalSetsNumber = require("../queries/phrasebooks/queryTotalSetsNumber");

class PhrasebookService {
  async getAll() {
    const data = await fetchGraphQL(queryPhrasebooks, {});

    // console.log(data);

    return data?.sentenceSets?.nodes || [];
  }
  async getSingleBy(id, idType) {
    if (!id || !idType) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data =
      idType === "DATABASE_ID"
        ? await fetchGraphQL(queryPhrasebooksByID, { id })
        : await fetchGraphQL(queryPhrasebooksBySlug, { id });

    return data?.sentenceSet || [];
  }
  async getNameByID(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryPhrasebooksNameByID, { id });

    return data?.sentenceSet?.title || [];
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

      data = await fetchGraphQL(queryPhrasebooksByBotID, {
        botID: id,
        offset,
        size: parseInt(PER_PAGE),
      });
    }

    if (cursor !== undefined) {
      data = await fetchGraphQL(queryPhrasebooksByBotIDCursorSelector, {
        botID: id,
        cursor,
        size: parseInt(PER_PAGE),
      });
    }

    return data?.sentenceSets || [];
  }

  async getTotalSetsNumber(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryTotalSetsNumber, { botID: id });

    return data?.sentenceSets?.pageInfo?.offsetPagination?.total || null;
  }
}

module.exports = new PhrasebookService();
