module.exports = `
query queryPhrasebooksBySlug($slug: String!) {
  sentenceSetBy(slug: $slug) {
      title
      databaseId
     slug
      sentenceSetOptions {
        sentenceSetOptions {
          sentences {
            ... on Sentence {
              databaseId
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
  
`;
