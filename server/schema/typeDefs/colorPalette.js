const { gql } = require('apollo-server-express');

module.exports = {
  colorPalette: gql`
    type ColorPalette {
      background: String
      mainText: String
      subText: String
    }
  `,
  colorPaletteInput: gql`
    input ColorPaletteInput {
      background: String
      mainText: String
      subText: String
    }
  `,
};
