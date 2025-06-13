module.exports = `
query queryPhrasebooksByID($id: ID!) {
  sentenceSet(id: $id, idType: DATABASE_ID) {
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
