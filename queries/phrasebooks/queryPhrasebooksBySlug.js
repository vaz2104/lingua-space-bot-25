module.exports = `
query queryPhrasebooksBySlug($slug: String!) {
  sentenceSetBy(slug: $slug) {
      title
      databaseId
     slug
           levels {
        nodes {
          slug
          name
        }
      }
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
