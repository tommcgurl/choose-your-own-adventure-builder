const { gql } = require('apollo-server-express');

module.exports = {
  adventure: gql`
    type Adventure {
      id: ID
      authors: [User]
      published: Boolean
      title: String
      intro: JSON
      items: Items
      mainStory: MainStory
      colorPalette: ColorPalette
    }
  `,
  adventureInput: gql`
    input AdventureInput {
      id: ID
      authors: [UserInput]
      published: Boolean
      title: String
      intro: JSON
      items: ItemsInput
      mainStory: MainStoryInput
      colorPalette: ColorPaletteInput
    }
  `,
};
