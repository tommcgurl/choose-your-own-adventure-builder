import { addDecorator, configure } from '@storybook/react';
import React from 'react';
import CssBaseline from '../src/shared/components/CssBaseline';

addDecorator(Story => (
  <React.Fragment>
    <CssBaseline />
    <Story />
  </React.Fragment>
));

configure(
  require.context('../src', true, /\.story\.(js|jsx|ts|tsx|mdx)$/),
  module
);
