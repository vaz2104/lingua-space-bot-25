const fetchGraphQL = require("../lib/fetchGraphQL");
const queryGrammarRuleByBotID = require("../queries/grammar-rule/queryGrammarRuleByBotID");
const queryGrammarRuleByBotIDCursorSelector = require("../queries/grammar-rule/queryGrammarRuleByBotIDCursorSelector");
const queryGrammarRuleBySlug = require("../queries/grammar-rule/queryGrammarRuleBySlug");
const queryTotalSetsNumber = require("../queries/grammar-rule/queryTotalSetsNumber");

const queryGrammar = require("../queries/grammar/queryGrammar");
const queryGrammarBySlug = require("../queries/grammar/queryGrammarBySlug");
const querySentencesByGrammaSlug = require("../queries/grammar/querySentencesByGrammaSlug");

class GrammarService {
  async getAll() {
    const data = await fetchGraphQL(queryGrammar, {});
    // console.log(data);

    return data?.grammars?.nodes || [];
  }
  async getOneBySlug(slug) {
    const sentencesList = await fetchGraphQL(querySentencesByGrammaSlug, {
      slug,
    });
    const grammarData = await fetchGraphQL(queryGrammarBySlug, {
      slug,
    });

    // console.log(grammarData);

    const response = {
      title: grammarData?.grammar?.name,
      level: grammarData?.grammar?.GrammarOptions?.grammarOptions?.level,
      sentences: sentencesList?.sentences?.nodes,
    };

    return response || {};
  }

  async getOneBySlug(slug) {
    if (!slug) {
      throw new Error("Invalid data was sent"); // 400
    }

    const data = await fetchGraphQL(queryGrammarRuleBySlug, { slug });

    return data?.grammarRule || [];
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
