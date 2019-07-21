const { gql } = require('apollo-server-express');

module.exports = {
  breadcrumb: gql`
    type Breadcrumb {
      storyPartKey: String!
      position: Int!
      inventory: JSON
      stats: JSON
    }
  `,
  breadcrumbInput: gql`
    input BreadcrumbInput {
      storyPartKey: String!
      position: Int!
      inventory: JSON
      stats: JSON
    }
  `,
};
