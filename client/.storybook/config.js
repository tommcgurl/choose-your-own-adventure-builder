import { addDecorator, configure } from '@storybook/react';
import React from 'react';
import CssBaseline from '../src/shared/components/CssBaseline';
import { Provider, connect } from 'react-redux';
import initialState from '../src/shared/store/initialState';
import configureStore from '../src/shared/store/configureStore';

const store = configureStore(initialState);

addDecorator(Story => {
  const ConnectedStory = connect(state => ({ state }))(Story);
  return (
    <Provider store={store}>
      <CssBaseline />
      <ConnectedStory />
    </Provider>
  );
});

configure(
  require.context('../src', true, /\.story\.(js|jsx|ts|tsx|mdx)$/),
  module
);
