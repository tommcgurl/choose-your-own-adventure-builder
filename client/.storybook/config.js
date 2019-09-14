import { addDecorator, configure } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BigDivEnergy, Button } from '../src/shared/components';
import { toggleNightMode } from '../src/shared/store/actions/userSettingsActions';
import configureStore from '../src/shared/store/configureStore';
import initialState from '../src/shared/store/initialState';

const store = configureStore(initialState);

addDecorator(Story => {
  function toggleMode() {
    store.dispatch(toggleNightMode());
  }
  return (
    <Provider store={store}>
      <BigDivEnergy>
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={toggleMode}>Toggle Night Mode</Button>
        </div>
        <Story />
      </BigDivEnergy>
    </Provider>
  );
});

configure(
  require.context('../src', true, /\.story\.(js|jsx|ts|tsx|mdx)$/),
  module
);
