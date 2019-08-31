import { addDecorator, configure } from '@storybook/react';
import React from 'react';

addDecorator(Story => <Story />);

configure(
  require.context('../src', true, /\.story\.(js|jsx|ts|tsx|mdx)$/),
  module
);
