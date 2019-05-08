const { gql } = require('apollo-server-express');

module.exports = {
  mainStory: gql`
    type MainStory {
      firstPart: String
      storyParts: JSON
    }
  `,
  mainStoryInput: gql`
    input MainStoryInput {
      firstPart: String
      storyParts: JSON
    }
  `,
};
