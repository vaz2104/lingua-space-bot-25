module.exports = `
query queryWordSetNameByID($id: ID!) {
  wordSet(id: $id, idType: DATABASE_ID) {
    title(format: RENDERED)
  }
}
`;
