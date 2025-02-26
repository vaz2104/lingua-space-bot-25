  module.exports = `
  query getCrammarTopics {
    grammars(first: 1000) {
      nodes {
        name
        children {
          nodes {
            name
            grammarId
            slug
          }
        }
        slug
        grammarId
        parentId
        GrammarOptions {
          grammarOptions {
            level
          }
        }
      }
    }
  }
`