const { gql } = require('apollo-server-express');

module.exports = gql`
  type Adventure {
    id: ID
    authors: [User]
    published: Boolean
    title: String
    intro: String
    items: Items
    mainStory: MainStory
    colorPalette: ColorPalette
  }
`;
