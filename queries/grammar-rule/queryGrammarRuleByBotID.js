module.exports = `
query queryTextsByBotID($botID:[String], $offset: Int, $size: Int) {
  grammarRules(
    where: {offsetPagination: {offset: $offset, size: $size}, taxQuery: {taxArray: {taxonomy: BOT, terms: $botID, operator: IN, field: SLUG}}}
  ) {
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
}
`;
