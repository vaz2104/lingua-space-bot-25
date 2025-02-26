module.exports = `
  query getSentenceById($id: ID!) {
    sentence(id: $id, idType: DATABASE_ID) {
      title(format: RENDERED)
      sentenceOptions {
        sentenceOptions {
          audio
          fieldGroupName
          originalAudioUrl
          ruTranslation
          uaTranslation
          audioFile {
              mediaItemUrl
              databaseId
          }
        }
      }
      grammars {
        nodes {
          name
          grammarId
          parentId
        }
      }
    }
  }
`