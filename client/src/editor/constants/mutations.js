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
