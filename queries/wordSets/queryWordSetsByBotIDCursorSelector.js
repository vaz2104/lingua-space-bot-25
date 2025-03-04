module.exports = `
query queryWordSetsByBotIDCursorSelector($botID:[String], $cursor: String, $size: Int) {
  wordSets(
    where: { taxQuery: {taxArray: {taxonomy: BOT, terms: $botID, operator: IN, field: SLUG}}}
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
