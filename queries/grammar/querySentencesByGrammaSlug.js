module.exports = `
  query querySentencesByGrammaSlug($slug: [String]) {
  sentences(
    where: {taxQuery: {taxArray: {taxonomy: GRAMMAR, terms: $slug, operator: IN, field: SLUG}}}
    first: 10000
  ) {
      nodes {
        id
        title(format: RENDERED)
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
