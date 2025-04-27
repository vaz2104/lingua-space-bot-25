module.exports = `
query queryTextsByBotID($botID:[String], $offset: Int, $size: Int)  {
  texts(
    where: {offsetPagination: {offset: $offset, size: $size}, taxQuery: {taxArray: {taxonomy: BOT, terms: $botID, operator: IN, field: SLUG}}}
  ) {
    nodes {
        levels {
          nodes {
            slug
            name
          }
        }
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
    }
  }
}
`;
