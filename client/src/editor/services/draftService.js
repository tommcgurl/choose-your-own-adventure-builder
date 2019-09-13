import { gql } from 'apollo-boost';
import ValidationError from '../../shared/models/ValidationError';
import apolloClient from '../../shared/services/apolloClient';

const draftService = {
  getDrafts() {
    const GET_DRAFTS = gql`
      {
        user {
          drafts {
            id
            authors {
              username
            }
            title
            blurb
            items
            firstPartId
            storyParts
            published
            genre {
              id
              name
              description
            }
            coverImage
          }
        }
      }
    `;
    return apolloClient.query({ query: GET_DRAFTS }).then(response => {
      return response.data.user.drafts;
    });
  },
  getPublishedAdventures() {
    const GET_PUBLISHED_ADVENTURES = gql`
      {
        user {
          bibliography {
            id
            authors {
              username
            }
            title
            blurb
            items
            firstPartId
            storyParts
            published
            genre {
              id
              name
              description
            }
            coverImage
          }
        }
      }
    `;
    return apolloClient
      .query({ query: GET_PUBLISHED_ADVENTURES })
      .then(response => {
        return response.data.user.bibliography;
      });
  },
  saveAdventure(adventure) {
    const SAVE_DRAFT = gql`
      mutation saveDraft($adventure: AdventureInput!) {
        saveDraft(adventure: $adventure) {
          id
          title
          blurb
          items
          firstPartId
          storyParts
          genre {
            name
          }
          coverImage
        }
      }
    `;
    return apolloClient
      .mutate({ mutation: SAVE_DRAFT, variables: { adventure } })
      .then(response => {
        return response.data.saveDraft;
      });
  },
  deleteDraft(draftId) {
    const DELETE_DRAFT = gql`
      mutation deleteDraft($id: String!) {
        deleteDraft(adventureId: $id)
      }
    `;
    return apolloClient
      .mutate({ mutation: DELETE_DRAFT, variables: { id: draftId } })
      .then(response => {
        return response.data.deleteDraft;
      });
  },
  validateDraftReadyToPublish(draft) {
    const errors = [];
    if (!draft.genre) {
      errors.push(
        new ValidationError(
          'genre',
          'A draft cannot be published without a genre.'
        )
      );
    }

    return errors;
  },
};

export default draftService;
