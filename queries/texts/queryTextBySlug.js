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
          quizGroup {
            quiz {
              question
              correctAnswer
              answers {
                answer
              }
            }
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
