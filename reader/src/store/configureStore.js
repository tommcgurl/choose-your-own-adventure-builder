import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { install } from 'redux-loop';
import persistMiddlware from '../middleware/persistStoreMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {

  // Set up any middleware that should always be applied.
  let middleware = [persistMiddlware];

  // Only require and apply development middlware when not
  // running in production mode.
  if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_NODE_ENV !== 'production') {
    const logger = require('redux-logger').default;
    middleware = [...middleware, logger];
  } else {
    // Apply all production specific middlware here.
    middleware = [...middleware];
  }

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(install(), applyMiddleware(...middleware))
  );
}
