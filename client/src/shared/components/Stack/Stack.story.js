import { storiesOf } from '@storybook/react';
import React from 'react';
import Stack from './Stack';

storiesOf('Layout|Stack', module)
  .addParameters({ component: Stack })
  .add('default', () => (
    <Stack>
      <div style={{ border: 'solid' }}>These</div>
      <div style={{ border: 'solid' }}>items</div>
      <div style={{ border: 'solid' }}>have</div>
      <div style={{ border: 'solid' }}>equal</div>
      <div style={{ border: 'solid' }}>space</div>
      <div style={{ border: 'solid' }}>between</div>
      <div style={{ border: 'solid' }}>them</div>
      <div style={{ border: 'solid' }}>vertically.</div>
    </Stack>
  ))
  .add('center', () => (
    <Stack align="center">
      <div style={{ border: 'solid' }}>These</div>
      <div style={{ border: 'solid' }}>items</div>
      <div style={{ border: 'solid' }}>have</div>
      <div style={{ border: 'solid' }}>equal</div>
      <div style={{ border: 'solid' }}>space</div>
      <div style={{ border: 'solid' }}>between</div>
      <div style={{ border: 'solid' }}>them</div>
      <div style={{ border: 'solid' }}>vertically.</div>
    </Stack>
  ))
  .add('right', () => (
    <Stack align="right">
      <div style={{ border: 'solid' }}>These</div>
      <div style={{ border: 'solid' }}>items</div>
      <div style={{ border: 'solid' }}>have</div>
      <div style={{ border: 'solid' }}>equal</div>
      <div style={{ border: 'solid' }}>space</div>
      <div style={{ border: 'solid' }}>between</div>
      <div style={{ border: 'solid' }}>them</div>
      <div style={{ border: 'solid' }}>vertically.</div>
    </Stack>
  ));
