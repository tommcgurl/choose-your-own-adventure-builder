import apolloClient from './apolloClient';
import { GET_ADVENTURE } from '../constants/queries';
import { GET_ADVENTURES } from '../constants/queries';

export default class AdventureService {
  static getAdventure(id) {
    return apolloClient.query({ query: GET_ADVENTURE, variables: { id } });
  }

  static getAdventures() {
    return apolloClient.query({ query: GET_ADVENTURES });
  }
}
