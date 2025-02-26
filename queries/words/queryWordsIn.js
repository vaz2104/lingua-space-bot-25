module.exports = `
    query getWordsIn($in: [ID]) {
        words(first: 1000, where: {in: $in}) {
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