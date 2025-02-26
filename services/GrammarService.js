const fetchGraphQL = require("../lib/fetchGraphQL");
const queryGrammarRuleByBotID = require("../queries/grammar-rule/queryGrammarRuleByBotID");
const queryGrammarRuleBySlug = require("../queries/grammar-rule/queryGrammarRuleBySlug");
const queryTotalSetsNumber = require("../queries/grammar-rule/queryTotalSetsNumber");

const queryGrammar = require("../queries/grammar/queryGrammar");
const queryGrammarBySlug = require("../queries/grammar/queryGrammarBySlug");
const querySentencesByGrammaSlug = require("../queries/grammar/querySentencesByGrammaSlug");

class GrammarService {
  async getAll() {
    const data = await fetchGraphQL(queryGrammar, {});
    console.log(data);

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
  async getByBotID(id, page) {
    if (!id) {
      throw new Error("Invalid data was sent"); // 400
    }

    const PER_PAGE = process.env.PER_PAGE;
    const offset = page ? (page - 1) * PER_PAGE : 0;

    const data = await fetchGraphQL(queryGrammarRuleByBotID, {
      botID: id,
      offset,
      size: parseInt(PER_PAGE),
    });

    return data?.grammarRules?.nodes || [];
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
