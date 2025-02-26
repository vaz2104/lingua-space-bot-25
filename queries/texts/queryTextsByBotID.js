module.exports = `
query queryTextsByBotID($botID:[String]) {
  texts(
    where: {taxQuery: {taxArray: {taxonomy: BOT, terms: $botID, operator: IN, field: SLUG}}}
    first: 10000
  ) {
    nodes {
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
    }
  }
}
`;
