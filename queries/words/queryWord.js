module.exports = `
    query getWord($id: ID!) {
        word(id: $id, idType: DATABASE_ID) {
            title(format: RENDERED)
            wordOptions {
                wordOptions {
                    sound
                    uaTranslation
                    ruTranslation
                    interpretation
                    image
                    transcription
                    soundfile {
                        mediaItemUrl
                        databaseId
                    }
                    imgfile {
                        mediaItemUrl
                        databaseId
                    }
                }
            }
        }
    }
  
`;
