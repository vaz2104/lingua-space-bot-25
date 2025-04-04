module.exports = `
query queryTextBySlug($id: ID!) {
  text(id: $id, idType: SLUG) {
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
