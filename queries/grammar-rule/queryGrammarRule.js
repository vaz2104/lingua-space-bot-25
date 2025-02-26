module.exports = `
query getWordSets {
  wordSets(
    where: {taxQuery: {taxArray: {taxonomy: WORDLISTTYPE, terms: "for-test", operator: NOT_IN, field: SLUG}}}
    first: 10000
  ) {
      nodes {
        slug
        title(format: RENDERED)
        wordSetOptions {
          wordSetOptions {
            words {
              ... on Word {
                id
              }
            }
          }
        }
      }
    }
}
  
`;
