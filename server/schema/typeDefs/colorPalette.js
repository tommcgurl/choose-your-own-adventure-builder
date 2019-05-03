const { gql } = require('apollo-server-express');

module.exports = gql`
  type ColorPalette {
    background: String
    mainText: String
    subText: String
  }
`;
