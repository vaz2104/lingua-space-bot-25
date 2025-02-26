module.exports = `
query getSentences($terms: [String], $notIn: [ID]) {
    sentences(
      where: {taxQuery: {taxArray: {taxonomy: GRAMMAR, terms: $terms}}, notIn: $notIn}
      first: 10
    ) {
      nodes {
        databaseId
      }
    }
  }
`