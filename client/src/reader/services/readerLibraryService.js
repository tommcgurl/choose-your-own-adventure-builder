import apolloClient from '../../shared/services/apolloClient';
import { REMOVE_FROM_LIBRARY, SAVE_TO_LIBRARY } from '../constants/mutations';
import { GET_LIBRARY } from '../constants/queries';
import convertPlotsToHtml from '../helpers/convertPlotsToHtml';

export default {
  addStoryToLibrary(id) {
    return apolloClient.mutate({
      mutation: SAVE_TO_LIBRARY,
      variables: { id },
    });
  },
  fetchLibrary() {
    return apolloClient
      .query({
        query: GET_LIBRARY,
      })
      .then(response => {
        return response.data.user.library.map(libraryBook => ({
          ...libraryBook,
          adventure: convertPlotsToHtml(libraryBook.adventure),
        }));
      });
  },
  removeStoryFromLibrary(id) {
    return apolloClient.mutate({
      mutation: REMOVE_FROM_LIBRARY,
      variables: { id },
    });
  },
  updateProgress(id, progress) {
    return apolloClient
      .mutate({
        mutation: SAVE_TO_LIBRARY,
        variables: { id, progress },
      })
      .then(res => Boolean(res.data.saveToLibrary));
  },
};
