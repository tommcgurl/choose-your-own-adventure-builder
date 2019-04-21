import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { install } from 'redux-loop';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(install(), applyMiddleware(logger)))
}
