import { gql } from 'apollo-boost';

export const SAVE_TO_LIBRARY = gql`
  mutation saveToLibrary($id: String!, $progress: [BreadcrumbInput]!) {
    saveToLibrary(adventureId: $id, progress: $progress)
  }
`;

export const REMOVE_FROM_LIBRARY = gql`
  mutation removeFromLibrary($id: String!) {
    removeFromLibrary(adventureId: $id)
  }
`;
