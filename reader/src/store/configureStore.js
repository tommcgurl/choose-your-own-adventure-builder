import { createStore, compose } from 'redux';
import rootReducer from '../reducers';
import { install } from 'redux-loop';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, composeEnhancers(install()));
}
