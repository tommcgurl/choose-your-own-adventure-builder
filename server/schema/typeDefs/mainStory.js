const { gql } = require('apollo-server-express');

module.exports = gql`
  type MainStory {
    firstPart: String
    storyParts: String
  }
`;
