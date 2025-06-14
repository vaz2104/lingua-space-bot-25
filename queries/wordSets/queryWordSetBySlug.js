module.exports = `
query queryWordSetBySlug($id: ID!) {
  wordSet(id: $id, idType: SLUG) {
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
                interpretation
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
