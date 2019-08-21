import { configure } from '@storybook/react';

// const loadStories = () => {
//   const req = require.context('../src', true, /\.story\.(js|mdx)$/);
//   req.keys().forEach(filename => req(filename));
// };


configure(require.context('../src', true, /\.story\.(js|jsx|ts|tsx|mdx)$/), module);