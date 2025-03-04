module.exports = `
query queryWordSetBySlug($slug: ID!) {
  wordSet(id: $slug, idType: SLUG) {
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
