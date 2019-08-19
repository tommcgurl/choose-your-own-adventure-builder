import { gql } from 'apollo-boost';

export const SAVE_DRAFT = gql`
  mutation saveDraft($adventure: AdventureInput!) {
    saveDraft(adventure: $adventure) {
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
