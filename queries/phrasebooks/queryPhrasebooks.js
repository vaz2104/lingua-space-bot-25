module.exports = `
query MyQuery {
  sentenceSets(first: 10000) {
    nodes {
      title
      databaseId
      slug
      sentenceSetOptions {
        sentenceSetOptions {
          sentences {
            ... on Sentence {
              id
            }
          }
        }
      }
    }
  }
}
`;
