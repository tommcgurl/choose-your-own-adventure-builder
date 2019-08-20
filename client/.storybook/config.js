import { configure } from '@storybook/react';

const loadStories = () => {
  const req = require.context('../src', true, /\.story\.js$/);
  req.keys().forEach(filename => req(filename));
};

configure(loadStories, module);