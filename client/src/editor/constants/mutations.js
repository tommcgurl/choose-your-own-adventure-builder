import { gql } from 'apollo-boost';

export const SAVE_DRAFT = gql`
  mutation saveDraft($adventure: AdventureInput!) {
    saveDraft(adventure: $adventure) {
      id
      title
      published
      intro
      items
      mainStory
    }
  }
`;

export const DELETE_DRAFT = gql`
  mutation deleteDraft($id: String!) {
    deleteDraft(id: $id)
  }
`;
