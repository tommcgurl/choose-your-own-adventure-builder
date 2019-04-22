import localforage from 'localforage';
import debounce from 'lodash.debounce';

import { STORAGE_ID } from '../constants';

const _perisistState = async (state) => {
  await localforage.setItem(STORAGE_ID, state)
  try {
    debugger;
    const persistedState = await localforage.getItem(STORAGE_ID)
    if (persistedState) {
      console.log('Current progress successfully saved.');
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log('Failed to save progress')
  }
}

// Create a debounced function so that we don't try to persist
// the Reader state on every action that is dispatched. This will
// batch all calls to it for 3 seconds.
const debouncedPersistState = debounce(_perisistState, 3000)

const persistMiddleware = store => next => action => {
  // We probably don't want to persist any failed actions.
  // we can modify this later if needed.
  if (action.type.indexOf('FAIL') >= 0 ) {
    next(action);
  } else {
    debugger;
    debouncedPersistState(store.getState());
    next(action);
  }
}

export default persistMiddleware;