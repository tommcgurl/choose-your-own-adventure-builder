import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import configureStore from '../../store/configureStore';
import StoryList from '../../components/StoryList';

const store = configureStore({
  stories: [
    { id: 1, title: '1', author: '1' },
    { id: 2, title: '2', author: '2' },
  ],
});

const withProvider = storybookStory => (
  <Provider store={store}>{storybookStory()}</Provider>
);

storiesOf('StoryList', module)
  .addDecorator(withProvider)
  .add('works!', () => <StoryList />);
