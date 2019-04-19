import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';

import VisibleStoryList from '../../components/containers/VisibleStoryList/VisibleStoryList';

const store = configureStore();

const withProvider = story => <Provider store={store}>{story()}</Provider>;

storiesOf('StoryList', module)
  .addDecorator(withProvider)
  .add('works!', () => <VisibleStoryList />);
