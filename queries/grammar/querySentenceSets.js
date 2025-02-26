module.exports = `
    query getSentenceSets {
        sentenceSets(first: 100) {
            nodes {
                title(format: RENDERED)
                databaseId
                sentenceSetOptions {
                    sentenceSetOptions {
                        sentences {
                            ... on Sentence {
                                id
                                databaseId
                            }
                        }
                    }
                }
            }
        }
    }
`