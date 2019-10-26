import React from 'react';
import { storiesOf } from '@storybook/react';
import ReviewEditor from './ReviewEditor';

storiesOf('ReviewEditor', module)
  .addParameters({ component: ReviewEditor })
  .add('default', () => <ReviewEditor />);
