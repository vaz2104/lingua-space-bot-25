module.exports = `
query queryPhrasebooksBySlug($id: ID!) {
  sentenceSet(id: $id, idType: SLUG) {
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
          image {
            mediaItemUrl
          }
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
