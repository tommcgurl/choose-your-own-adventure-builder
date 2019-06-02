import { gql } from 'apollo-boost';

export const ADD_TO_LIBRARY = gql`
  mutation addToLibrary($id: String!) {
    addToLibrary(id: $id)
  }
`;

export const REMOVE_FROM_LIBRARY = gql`
  mutation removeFromLibrary($id: String!) {
    removeFromLibrary(id: $id)
  }
`;
