module.exports = `
query queryPhrasebooksByBotIDCursorSelector($botID:[String], $cursor: String, $size: Int) {
  sentenceSets(    
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
      title(format: RENDERED)
      slug
      databaseId
      sentenceSetOptions {
        sentenceSetOptions {
          image {
            mediaItemUrl
          }
          sentences {
            ... on Sentence {
              id
              title(format: RENDERED)
              sentenceOptions {
                sentenceOptions {
                  uaTranslation
                  audioFile {
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

  
`;
