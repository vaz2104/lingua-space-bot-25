const fetchGraphQL = require("../lib/fetchGraphQL");
const queryPhrasebooksBySlug = require("../queries/phrasebooks/queryPhrasebooksBySlug");
const queryPhrasebooks = require("../queries/phrasebooks/queryPhrasebooks");
const queryPhrasebooksByBotID = require("../queries/phrasebooks/queryPhrasebooksByBotID");
const queryTotalSetsNumber = require("../queries/phrasebooks/queryTotalSetsNumber");

class PhrasebookService {
  async getAll() {
    const data = await fetchGraphQL(queryPhrasebooks, {});

    console.log(data);

    return data?.sentenceSets?.nodes || [];
  }
  async getOneBySlug(slug) {
    if (!slug) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryPhrasebooksBySlug, { slug });

    return data?.sentenceSetBy || [];
  }
  async getByBotID(id, page) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const PER_PAGE = process.env.PER_PAGE;
    const offset = page ? (page - 1) * PER_PAGE : 0;

    const data = await fetchGraphQL(queryPhrasebooksByBotID, {
      botID: id,
      offset,
      size: parseInt(PER_PAGE),
    });

    return data?.sentenceSets?.nodes || [];
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
