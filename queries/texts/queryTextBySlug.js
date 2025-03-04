module.exports = `
query queryTextBySlug($slug: ID!) {
  text(id: $slug, idType: SLUG) {
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
