import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fetchDrafts } from './actions/draftActions';
import App from './App';
import apolloClient from './services/apolloClient';
import StatePersistenceService from './services/StatePersistenceService';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import initialState from './store/initialState';

// Check to see if we have any persisted state to
// "hydrate" the app with.
const setup = async () => {
  const persistedState = await StatePersistenceService.getPersistedState();
  if (persistedState) {
    apolloClient.setToken(persistedState.token);
  }
  const store = configureStore(persistedState || initialState);
  store.dispatch(fetchDrafts());

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
};

setup();
