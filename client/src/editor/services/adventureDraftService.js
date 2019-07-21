import ValidationError from '../../shared/models/ValidationError';
import apolloClient from '../../shared/services/apolloClient';
import { DELETE_DRAFT, SAVE_ADVENTURE } from '../constants/mutations';
import { GET_ADVENTURES_AUTHORED_BY_REQUESTING_USER } from '../constants/queries';

export default {
  getAdventuresAuthoredByUser() {
    return apolloClient
      .query({ query: GET_ADVENTURES_AUTHORED_BY_REQUESTING_USER })
      .then(response => {
        return response.data.adventuresByRequestingUser;
      });
  },
  saveAdventure(adventure) {
    return apolloClient
      .mutate({ mutation: SAVE_ADVENTURE, variables: { adventure } })
      .then(response => {
        return response.data.saveAdventure;
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
