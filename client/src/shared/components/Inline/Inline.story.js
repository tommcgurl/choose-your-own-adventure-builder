import { storiesOf } from '@storybook/react';
import React from 'react';
import Inline from './Inline';

storiesOf('Layout|Inline', module)
  .addParameters({ component: Inline })
  .add('default', () => (
    <Inline>
      <div style={{ border: 'solid' }}>These</div>
      <div style={{ border: 'solid' }}>items</div>
      <div style={{ border: 'solid' }}>are</div>
      <div style={{ border: 'solid' }}>spaced</div>
      <div style={{ border: 'solid' }}>out</div>
      <div style={{ border: 'solid' }}>and</div>
      <div style={{ border: 'solid' }}>when</div>
      <div style={{ border: 'solid' }}>they</div>
      <div style={{ border: 'solid' }}>wrap</div>
      <div style={{ border: 'solid' }}>there</div>
      <div style={{ border: 'solid' }}>is</div>
      <div style={{ border: 'solid' }}>equal</div>
      <div style={{ border: 'solid' }}>space</div>
      <div style={{ border: 'solid' }}>between</div>
      <div style={{ border: 'solid' }}>them</div>
      <div style={{ border: 'solid' }}>vertically.</div>
    </Inline>
  ))
  .add('center', () => (
    <Inline align="center">
      <div style={{ border: 'solid' }}>These</div>
      <div style={{ border: 'solid' }}>items</div>
      <div style={{ border: 'solid' }}>are</div>
      <div style={{ border: 'solid' }}>spaced</div>
      <div style={{ border: 'solid' }}>out</div>
      <div style={{ border: 'solid' }}>and</div>
      <div style={{ border: 'solid' }}>when</div>
      <div style={{ border: 'solid' }}>they</div>
      <div style={{ border: 'solid' }}>wrap</div>
      <div style={{ border: 'solid' }}>there</div>
      <div style={{ border: 'solid' }}>is</div>
      <div style={{ border: 'solid' }}>equal</div>
      <div style={{ border: 'solid' }}>space</div>
      <div style={{ border: 'solid' }}>between</div>
      <div style={{ border: 'solid' }}>them</div>
      <div style={{ border: 'solid' }}>vertically.</div>
    </Inline>
  ))
  .add('right', () => (
    <Inline align="right">
      <div style={{ border: 'solid' }}>These</div>
      <div style={{ border: 'solid' }}>items</div>
      <div style={{ border: 'solid' }}>are</div>
      <div style={{ border: 'solid' }}>spaced</div>
      <div style={{ border: 'solid' }}>out</div>
      <div style={{ border: 'solid' }}>and</div>
      <div style={{ border: 'solid' }}>when</div>
      <div style={{ border: 'solid' }}>they</div>
      <div style={{ border: 'solid' }}>wrap</div>
      <div style={{ border: 'solid' }}>there</div>
      <div style={{ border: 'solid' }}>is</div>
      <div style={{ border: 'solid' }}>equal</div>
      <div style={{ border: 'solid' }}>space</div>
      <div style={{ border: 'solid' }}>between</div>
      <div style={{ border: 'solid' }}>them</div>
      <div style={{ border: 'solid' }}>vertically.</div>
    </Inline>
  ));
