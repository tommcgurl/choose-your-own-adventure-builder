import debounce from 'lodash.debounce';
import StatePersistenceService from '../services/StatePersistenceService';


// Create a debounced function so that we don't try to persist
// the Reader state on every action that is dispatched. This will
// batch all calls to it for 2 seconds.
const debouncedPersistState = debounce(
  StatePersistenceService.perisistState,
  2000
);

const persistMiddleware = store => next => action => {
  // We probably don't want to persist any failed actions.
  // we can modify this later if needed.
  if (action.type.indexOf('FAIL') >= 0 ) {
    next(action);
  } else {
    next(action);
    debouncedPersistState(store.getState());
  }
}

export default persistMiddleware;