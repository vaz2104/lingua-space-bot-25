const fetchGraphQL = require("../lib/fetchGraphQL");
const queryTextBySlug = require("../queries/texts/queryTextBySlug");
const queryTextByID = require("../queries/texts/queryTextByID");
const queryTextNameByID = require("../queries/texts/queryTextNameByID");
const queryTextsByBotID = require("../queries/texts/queryTextsByBotID");
const queryTextsByBotIDCursorSelector = require("../queries/texts/queryTextsByBotIDCursorSelector");
const queryTotalSetsNumber = require("../queries/texts/queryTotalSetsNumber");

class TextService {
  async getSingleBy(id, idType) {
    if (!id || !idType) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data =
      idType === "DATABASE_ID"
        ? await fetchGraphQL(queryTextByID, { id })
        : await fetchGraphQL(queryTextBySlug, { id });

    return data?.text || [];
  }
  async getTextsNameByID(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryTextNameByID, { id });
    // console.log(data);

    return data?.text?.title || [];
  }
  async getByBotID(id, query) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    // const data = await fetchGraphQL(queryTextsByBotID, { botID: id });
    const { page, cursor } = query;
    const PER_PAGE = process.env.PER_PAGE;
    let data = null;

    if (page !== undefined) {
      const offset = page ? (page - 1) * PER_PAGE : 0;

      data = await fetchGraphQL(queryTextsByBotID, {
        botID: id,
        offset,
        size: parseInt(PER_PAGE),
      });
    }

    if (cursor !== undefined) {
      data = await fetchGraphQL(queryTextsByBotIDCursorSelector, {
        botID: id,
        cursor,
        size: parseInt(PER_PAGE),
      });
    }

    return data?.texts || [];
  }
  async getTotalSetsNumber(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryTotalSetsNumber, { botID: id });

    return data?.texts?.pageInfo?.offsetPagination?.total || null;
  }
}

module.exports = new TextService();
