import apolloClient from '../../shared/services/apolloClient';
import { GET_ADVENTURE, GET_ADVENTURES } from '../constants/queries';

export default class AdventureService {
  static getAdventure(id) {
    return apolloClient.query({ query: GET_ADVENTURE, variables: { id } });
  }

  static getAdventures(first, publishedBefore) {
    return apolloClient
      .query({
        query: GET_ADVENTURES,
        variables: { first, publishedBefore },
      })
      .then(response => response.data.adventures);
  }
}
