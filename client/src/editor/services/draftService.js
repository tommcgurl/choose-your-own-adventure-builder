import ValidationError from '../../shared/models/ValidationError';
import apolloClient from '../../shared/services/apolloClient';
import { DELETE_DRAFT, SAVE_DRAFT } from '../constants/mutations';
import { GET_DRAFTS, GET_PUBLISHED_ADVENTURES } from '../constants/queries';

export default {
  getDrafts() {
    return apolloClient.query({ query: GET_DRAFTS }).then(response => {
      return response.data.user.drafts;
    });
  },
  getPublishedAdventures() {
    return apolloClient
      .query({ query: GET_PUBLISHED_ADVENTURES })
      .then(response => {
        return response.data.user.bibliography;
      });
  },
  saveAdventure(adventure) {
    return apolloClient
      .mutate({ mutation: SAVE_DRAFT, variables: { adventure } })
      .then(response => {
        return response.data.saveDraft;
      });
  },
  deleteDraft(draftId) {
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
