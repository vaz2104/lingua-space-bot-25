module.exports = `
    query getWordsIn($in: [ID]) {
        words(where: {in: $in}) {
            nodes {
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
                title(format: RENDERED)
                databaseId
            }
        }
    }
`;
