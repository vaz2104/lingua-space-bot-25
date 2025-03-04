module.exports = `
query queryTextsByBotIDCursorSelector($botID:[String], $cursor: String, $size: Int)  {
  texts(
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
        levels {
          nodes {
            slug
            name
          }
        }
        databaseId
        slug
        title(format: RENDERED)
        TextOptions {
          textOptions {
            content
            audio {
              mediaItemUrl
            }
            image {
              mediaItemUrl
            }
          }
        }
    }
  }
}
`;
