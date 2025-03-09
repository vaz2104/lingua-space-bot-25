module.exports = `
query queryGrammarRuleNameByID($id: ID!) {
    grammarRule(id: $id, idType: DATABASE_ID) {
    title(format: RENDERED)
  }
}
  
`;
