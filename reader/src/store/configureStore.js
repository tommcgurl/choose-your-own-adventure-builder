import { createStore, compose } from 'redux';
import rootReducer from '../reducers';
import { install } from 'redux-loop';

const enhancer = compose(install());

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
