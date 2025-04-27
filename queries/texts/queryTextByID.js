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
