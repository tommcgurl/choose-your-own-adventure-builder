import localforage from 'localforage';
import { STORAGE_ID } from '../constants';

export default class StatePersistenceService {
  static async perisistState(state) {
    await localforage.setItem(STORAGE_ID, state);
    try {
      const persistedState = await localforage.getItem(STORAGE_ID);
      if (persistedState) {
        console.log(
          '%cCurrent progress successfully saved.',
          'color: green; font-weight: 600',
        );
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Failed to save progress');
    }
  }

  static async getPersistedState() {
    const persistedState = await localforage.getItem(STORAGE_ID);
    return persistedState;
  }
}
