module.exports = `
query queryPhrasebooksNameByID($id: ID!) {
  sentenceSet(id: $id, idType: DATABASE_ID) {
      title
  }
}
  
`;
