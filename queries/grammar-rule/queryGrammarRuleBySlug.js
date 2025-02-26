module.exports = `
query queryGrammarRuleBySlug($slug: ID!) {
    grammarRule(id: $slug, idType: SLUG) {
    databaseId
    title(format: RENDERED)
    slug
    RulesData {
      rulesData {
        sentences {
          ... on Sentence {
            id
            databaseId
            slug
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
        content
      }
    }
  }
}
  
`;
