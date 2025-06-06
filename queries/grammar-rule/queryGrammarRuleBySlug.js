module.exports = `
query queryGrammarRuleBySlug($id: ID!) {
    grammarRule(id: $id, idType: SLUG) {
    databaseId
    title(format: RENDERED)
    slug
          levels {
        nodes {
          slug
          name
        }
      }
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
