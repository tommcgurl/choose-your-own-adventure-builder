import apolloClient from '../../shared/services/apolloClient';
import { ADD_TO_LIBRARY, REMOVE_FROM_LIBRARY } from '../constants/mutations';

class LibraryService {
  static addStoryToLibrary(id) {
    return apolloClient.mutate({ mutation: ADD_TO_LIBRARY, variables: { id } });
  }

  static removeStoryFromLibrary(id) {
    return apolloClient.mutate({
      mutation: REMOVE_FROM_LIBRARY,
      variables: { id },
    });
  }
}

export default LibraryService;
