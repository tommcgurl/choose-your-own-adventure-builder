import { addDecorator, configure } from '@storybook/react';
import 'normalize.css';
import React from 'react';
import '../src/index.css';
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
