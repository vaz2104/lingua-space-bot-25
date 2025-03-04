module.exports = `
query queryGrammarRuleByBotIDCursorSelector($botID:[String], $cursor: String, $size: Int) {
  grammarRules(
    where: {taxQuery: {taxArray: {taxonomy: BOT, terms: $botID, operator: IN, field: SLUG}}}
    after: $cursor
    first: $size
  ) {
    pageInfo {
      offsetPagination {
        total
        hasMore
      }
      endCursor
    }
    nodes {
      title(format: RENDERED)
      slug
      databaseId
      levels {
        nodes {
          slug
          name
        }
      }
           RulesData {
      rulesData {
        content
      }
    }
  }
}
`;
