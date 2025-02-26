module.exports = `
 query queryGrammarBySlug($slug: ID!) {
  grammar(id: $slug, idType: SLUG) {
    GrammarOptions {
      grammarOptions {
        uaRules
        level
      }
    }
    name
  }
}
`;
