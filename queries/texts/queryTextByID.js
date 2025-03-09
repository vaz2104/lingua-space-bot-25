module.exports = `
query queryTextByID($id: ID!) {
  text(id: $id, idType: DATABASE_ID) {
      databaseId
      slug
      title(format: RENDERED)
      TextOptions {
        textOptions {
          content
          audio {
            mediaItemUrl
          }
          image {
            mediaItemUrl
          }
        }
      }
      levels {
        nodes {
          slug
          name
        }
      }
  }
}
  
`;
