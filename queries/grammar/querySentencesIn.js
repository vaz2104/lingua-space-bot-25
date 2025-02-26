module.exports = `
query getSentences($In: [ID]) {
    sentences(
      first: 1000
      where: {in: $In}
    ) {
      nodes {
        databaseId
        sentenceOptions {
          sentenceOptions {
            uaTranslation
            ruTranslation
          }
        }
        title(format: RENDERED)
      }
    }
  }
`