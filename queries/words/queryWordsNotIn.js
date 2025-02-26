module.exports = `
    query getWordsNotIn($excluded: [ID]) {
        words(where: {notIn: $excluded}) {
            nodes {
                wordOptions {
                    wordOptions {
                        sound
                        ruTranslation
                        uaTranslation
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
                title(format: RENDERED)
                databaseId
            }
        }
    }
`