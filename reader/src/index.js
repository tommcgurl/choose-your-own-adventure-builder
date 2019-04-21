import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { fetchStories, fetchStory } from './actions/storyActions';

const store = configureStore();
store.dispatch(fetchStories());
store.dispatch(fetchStory());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
