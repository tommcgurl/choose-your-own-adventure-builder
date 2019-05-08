import { gql } from 'apollo-boost';

export const SAVE_DRAFT = gql`
  mutation saveDraft($adventure: AdventureInput!) {
    saveDraft(adventure: $adventure) {
      id
      title
      intro
      items {
        prompt
        options
        limit
      }
      mainStory {
        firstPart
        storyParts
      }
      colorPalette {
        background
        mainText
        subText
      }
    }
  }
`;
