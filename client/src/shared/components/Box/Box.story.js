import { storiesOf } from '@storybook/react';
import React from 'react';
import Box from './Box';

storiesOf('Layout|Box', module)
  .addParameters({ component: Box })
  .add('default', () => (
    <Box>
      <div style={{ backgroundColor: 'lightgrey' }}>
        This <pre style={{ display: 'inline' }}>div</pre> is in a{' '}
        <pre style={{ display: 'inline' }}>Box</pre> which takes the full width
        of its container and is provided padding on all sides. K thanks bye!
      </div>
    </Box>
  ))
  .add('less content', () => (
    <Box>
      <div style={{ backgroundColor: 'lightgrey' }}>Less content</div>
    </Box>
  ));
