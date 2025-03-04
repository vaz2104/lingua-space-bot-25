module.exports = `
query queryWordSetsByBotID($botID:[String]) {
  wordSets(
    where: {taxQuery: {taxArray: {taxonomy: BOT, terms: $botID, operator: IN, field: SLUG}}}
    first: 20000
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
      levels {
        nodes {
          slug
          name
        }
      }
    }
  }
}

  
`;
