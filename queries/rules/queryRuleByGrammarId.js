module.exports = `
query queryRuleByGrammarId($terms: [String]) {
  grammarRules(where: {taxQuery: {taxArray: {taxonomy: GRAMMAR, terms: $terms}}}) {
    nodes {
      title(format: RENDERED)
      RulesData {
        rulesData {
          descriptionRu
          descriptionUa
          titleRu
          titleUa
        }
      }
    }
  }
}

`