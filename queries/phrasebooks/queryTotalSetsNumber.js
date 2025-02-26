module.exports = `
query queryTotalSetsNumber($botID:[String]) {
  sentenceSets(
    where: {taxQuery: {taxArray: {taxonomy: BOT, terms: $botID, operator: IN, field: SLUG}}}
  ) {
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}
`;
