module.exports = `
query queryTextNameByID($id: ID!) {
  text(id: $id, idType: DATABASE_ID) {
      title(format: RENDERED)
  }
}
  
`;
