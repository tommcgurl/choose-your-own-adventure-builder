import { SAVE_DRAFT } from '../constants/mutations';
import { GET_DRAFTS } from '../constants/queries';
import { omitTypename } from '../helpers';
import apolloClient from './apolloClient';

export default class DraftService {
  static getDrafts() {
    return apolloClient.query({ query: GET_DRAFTS }).then(response => {
      return response.data.drafts.reduce((acc, nextDraft) => {
        return {
          ...acc,
          [nextDraft.id]: nextDraft,
        };
      }, {});
    });
  }

  static saveDraft(draft) {
    draft = JSON.parse(JSON.stringify(draft), omitTypename);
    return apolloClient
      .mutate({ mutation: SAVE_DRAFT, variables: { adventure: draft } })
      .then(response => {
        return response.data.saveDraft;
      });
  }
}
