import { storiesOf } from '@storybook/react';
import React from 'react';
import Box from '../Box/Box';
import Stack from './Stack';

storiesOf('Layout|Stack', module)
  .addParameters({ component: Stack })
  .add('default (left)', () => (
    <Stack>
      <div style={{ backgroundColor: 'lightgrey' }}>These</div>
      <div style={{ backgroundColor: 'lightgrey' }}>items</div>
      <div style={{ backgroundColor: 'lightgrey' }}>have</div>
      <div style={{ backgroundColor: 'lightgrey' }}>equal</div>
      <div style={{ backgroundColor: 'lightgrey' }}>space</div>
      <div style={{ backgroundColor: 'lightgrey' }}>between</div>
      <div style={{ backgroundColor: 'lightgrey' }}>them</div>
      <div style={{ backgroundColor: 'lightgrey' }}>vertically.</div>
    </Stack>
  ))
  .add('center', () => (
    <Stack align="center">
      <div style={{ backgroundColor: 'lightgrey' }}>These</div>
      <div style={{ backgroundColor: 'lightgrey' }}>items</div>
      <div style={{ backgroundColor: 'lightgrey' }}>have</div>
      <div style={{ backgroundColor: 'lightgrey' }}>equal</div>
      <div style={{ backgroundColor: 'lightgrey' }}>space</div>
      <div style={{ backgroundColor: 'lightgrey' }}>between</div>
      <div style={{ backgroundColor: 'lightgrey' }}>them</div>
      <div style={{ backgroundColor: 'lightgrey' }}>vertically.</div>
    </Stack>
  ))
  .add('right', () => (
    <Stack align="right">
      <div style={{ backgroundColor: 'lightgrey' }}>These</div>
      <div style={{ backgroundColor: 'lightgrey' }}>items</div>
      <div style={{ backgroundColor: 'lightgrey' }}>have</div>
      <div style={{ backgroundColor: 'lightgrey' }}>equal</div>
      <div style={{ backgroundColor: 'lightgrey' }}>space</div>
      <div style={{ backgroundColor: 'lightgrey' }}>between</div>
      <div style={{ backgroundColor: 'lightgrey' }}>them</div>
      <div style={{ backgroundColor: 'lightgrey' }}>vertically.</div>
    </Stack>
  ))
  .add('divider', () => (
    <Stack padding="none" divider>
      <Box>These</Box>
      <Box>items</Box>
      <Box>have</Box>
      <Box>equal</Box>
      <Box>space</Box>
      <Box>between</Box>
      <Box>them</Box>
      <Box>vertically.</Box>
    </Stack>
  ))
  .add('go fuck yourself', () => (
    <Stack align="right">
      <div style={{ backgroundColor: 'lightgrey' }}>These</div>
      <div style={{ backgroundColor: 'lightgrey' }}>
        <span style={{ display: 'flex' }}>items</span>
      </div>
    </Stack>
  ));
