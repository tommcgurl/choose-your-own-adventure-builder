import { addDecorator, configure } from '@storybook/react';
import 'normalize.css';
import React from 'react';
import '../src/index.css';

addDecorator(Story => <Story />);

configure(
  require.context('../src', true, /\.story\.(js|jsx|ts|tsx|mdx)$/),
  module
);
