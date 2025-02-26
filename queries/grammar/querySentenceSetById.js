module.exports = `
query querySentenceSetById($id: ID!) {
  sentenceSet(id: $id, idType: DATABASE_ID){
    id
    title(format: RENDERED)
    sentenceSetOptions {
      sentenceSetOptions {
        sentences {
          ... on Sentence {
            databaseId
          }
        }
        image {
          mediaItemUrl
          databaseId
        }
      }
    }
  }
}
  
`