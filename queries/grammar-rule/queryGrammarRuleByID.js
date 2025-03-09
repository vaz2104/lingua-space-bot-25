module.exports = `
query queryGrammarRuleByID($id: ID!) {
    grammarRule(id: $id, idType: DATABASE_ID) {
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
