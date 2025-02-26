module.exports = `
query queryPhrasebooksByBotID($botID:[String], $offset: Int, $size: Int) {
  sentenceSets(    
  where: {offsetPagination: {offset: $offset, size: $size}, taxQuery: {taxArray: {taxonomy: BOT, terms: $botID, operator: IN, field: SLUG}}}
) {
    nodes {
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
