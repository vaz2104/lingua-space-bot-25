module.exports = `
    query getPhrasesIn($in: [ID]) {
        sentences(where: {in: $in}) {
            nodes{
                title(format: RENDERED)
                databaseId
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
`;
