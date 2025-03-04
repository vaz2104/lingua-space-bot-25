module.exports = `
query queryTotalSetsNumber($botID:[String]) {
  texts(
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
