import { gql } from 'apollo-boost';

export const SAVE_DRAFT = gql`
  mutation saveAdventure($adventure: AdventureInput!) {
    saveAdventure(adventure: $adventure) {
      id
      title
      intro
      items
      mainStory
      genre {
        name
      }
      coverImage
    }
  }
`;

export const DELETE_DRAFT = gql`
  mutation deleteDraft($id: String!) {
    deleteDraft(adventureId: $id)
  }
`;
