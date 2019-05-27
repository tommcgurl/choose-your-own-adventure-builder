import { applyMiddleware, compose, createStore } from 'redux';
import { install } from 'redux-loop';
import persistMiddleware from '../middleware/persistStoreMiddleware';
import setJwtMiddleware from '../middleware/setJwtMiddleware';
import rootReducer from '../reducers';

export default function configureStore(initialState = {}) {
  let composeEnhancers = compose;

  // Set up any middleware that should always be applied.
  let middleware = [persistMiddleware, setJwtMiddleware];

  // Only require and apply development middlware when not
  // running in production mode.
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.REACT_APP_NODE_ENV !== 'production'
  ) {
    const logger = require('redux-logger').default;
    middleware = [...middleware, logger];
    composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers;
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
