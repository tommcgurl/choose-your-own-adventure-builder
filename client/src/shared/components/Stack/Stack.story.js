import { storiesOf } from '@storybook/react';
import React from 'react';
import Stack from './Stack';

storiesOf('Layout|Stack', module)
  .addParameters({ component: Stack })
  .add('default (justified)', () => (
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
  .add('left', () => (
    <Stack align="left">
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
  ));
