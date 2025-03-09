module.exports = `
query queryWordSetByID($id: ID!) {
  wordSet(id: $id, idType: DATABASE_ID) {
    databaseId
    slug
    title(format: RENDERED)
    levels {
      nodes {
        slug
        name
      }
    }
    wordSetOptions {
      wordSetOptions {
        image {
          mediaItemUrl
        }
        words {
          ... on Word {
            databaseId
            title(format: RENDERED)
            wordOptions {
              wordOptions {
                uaTranslation
                transcription
                soundfile {
                  mediaItemUrl
                }
                imgfile {
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
