const { gql } = require('apollo-server-express');

module.exports = {
  adventure: gql`
    type Adventure {
      id: ID
      authors: [User]
      published: DateTime
      title: String
      intro: JSON
      items: JSON
      mainStory: JSON
    }
  `,
  adventureInput: gql`
    input AdventureInput {
      id: ID
      authors: [UserInput]
      published: DateTime
      title: String
      intro: JSON
      items: JSON
      mainStory: JSON
    }
  `,
};
