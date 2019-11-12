import { storiesOf } from '@storybook/react';
import React from 'react';
import Box from './Box';

storiesOf('Layout|Box', module)
  .addParameters({ component: Box })
  .add('default', () => (
    <Box style={{ backgroundColor: 'lightgrey' }}>
      The default <pre style={{ display: 'inline' }}>Box</pre> is a{' '}
      <pre style={{ display: 'inline' }}>div</pre> which takes the full width of
      its container and has no margin and normal padding. K thanks bye!
    </Box>
  ))
  .add('component and padding', () => (
    <Box component="h1" padding="none" style={{ backgroundColor: 'lightgrey' }}>
      This <pre style={{ display: 'inline' }}>Box</pre> is an{' '}
      <pre style={{ display: 'inline' }}>h1</pre>. Notice that there is no
      margin.
    </Box>
  ))
  .add('shadow', () => (
    <Box>
      <Box shadow>
        This <pre style={{ display: 'inline' }}>Box</pre> is inside of another{' '}
        <pre style={{ display: 'inline' }}>Box</pre> to show off the shadow
        feature.
      </Box>
    </Box>
  ))
  .add('mobile and desktop values', () => (
    <Box padding={['none', 'normal']} style={{ backgroundColor: 'lightgrey' }}>
      This <pre style={{ display: 'inline' }}>Box</pre> has no padding on mobile
      widths and normal padding on desktop widths.
    </Box>
  ));
