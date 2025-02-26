module.exports = `
query queryWordSetsByBotID($botID:[String], $offset: Int, $size: Int) {
  wordSets(
    where: {offsetPagination: {offset: $offset, size: $size}, taxQuery: {taxArray: {taxonomy: BOT, terms: $botID, operator: IN, field: SLUG}}}
  ) {
    nodes {
      databaseId
      slug
      title(format: RENDERED)
      wordSetOptions {
        wordSetOptions {
          image {
            mediaItemUrl
          }
          words {
            ... on Word {
              id
            }
          }
        }
      }
    }
  }
}

  
`;
