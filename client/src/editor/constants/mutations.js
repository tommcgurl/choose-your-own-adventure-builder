import { gql } from 'apollo-boost';

export const SAVE_ADVENTURE = gql`
  mutation saveAdventure($adventure: AdventureInput!) {
    saveAdventure(adventure: $adventure) {
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
