const fetchGraphQL = require("../lib/fetchGraphQL");
const queryGrammarRuleByBotID = require("../queries/grammar-rule/queryGrammarRuleByBotID");
const queryGrammarRuleByBotIDCursorSelector = require("../queries/grammar-rule/queryGrammarRuleByBotIDCursorSelector");
const queryGrammarRuleBySlug = require("../queries/grammar-rule/queryGrammarRuleBySlug");
const queryGrammarRuleByID = require("../queries/grammar-rule/queryGrammarRuleByID");

const queryTotalSetsNumber = require("../queries/grammar-rule/queryTotalSetsNumber");
const queryGrammarRuleNameByID = require("../queries/grammar-rule/queryGrammarRuleNameByID");

class GrammarService {
  async getSingleBy(query) {
    if (!query?.id || !query?.idType) {
      throw new Error("Invalid data was sent"); // 400
    }
    const { idType, id } = query;

    const data =
      idType === "DATABASE_ID"
        ? await fetchGraphQL(queryGrammarRuleByID, { id })
        : await fetchGraphQL(queryGrammarRuleBySlug, { id });

    return data?.grammarRule || [];
  }

  async getGrammarNameByID(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryGrammarRuleNameByID, { id });

    return data?.grammarRule?.title || [];
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

      data = await fetchGraphQL(queryGrammarRuleByBotID, {
        botID: id,
        offset,
        size: parseInt(PER_PAGE),
      });
    }

    if (cursor !== undefined) {
      data = await fetchGraphQL(queryGrammarRuleByBotIDCursorSelector, {
        botID: id,
        cursor,
        size: parseInt(PER_PAGE),
      });
    }

    return data?.grammarRules || [];
  }

  async getTotalSetsNumber(id) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryTotalSetsNumber, { botID: id });

    return data?.grammarRules?.pageInfo?.offsetPagination?.total || null;
  }
}

module.exports = new GrammarService();
