import { storiesOf } from '@storybook/react';
import React from 'react';
import Stack from '../Stack/Stack';
import Inline from './Inline';

storiesOf('Layout|Inline', module)
  .addParameters({ component: Inline })
  .add('default', () => (
    <Inline>
      <div style={{ backgroundColor: 'lightgrey' }}>These</div>
      <div style={{ backgroundColor: 'lightgrey' }}>items</div>
      <div style={{ backgroundColor: 'lightgrey' }}>are</div>
      <div style={{ backgroundColor: 'lightgrey' }}>spaced</div>
      <div style={{ backgroundColor: 'lightgrey' }}>out</div>
      <div style={{ backgroundColor: 'lightgrey' }}>and</div>
      <div style={{ backgroundColor: 'lightgrey' }}>when</div>
      <div style={{ backgroundColor: 'lightgrey' }}>they</div>
      <div style={{ backgroundColor: 'lightgrey' }}>wrap</div>
      <div style={{ backgroundColor: 'lightgrey' }}>there</div>
      <div style={{ backgroundColor: 'lightgrey' }}>is</div>
      <div style={{ backgroundColor: 'lightgrey' }}>equal</div>
      <div style={{ backgroundColor: 'lightgrey' }}>space</div>
      <div style={{ backgroundColor: 'lightgrey' }}>between</div>
      <div style={{ backgroundColor: 'lightgrey' }}>them</div>
      <div style={{ backgroundColor: 'lightgrey' }}>vertically.</div>
    </Inline>
  ))
  .add('center', () => (
    <Inline align="center">
      <div style={{ backgroundColor: 'lightgrey' }}>These</div>
      <div style={{ backgroundColor: 'lightgrey' }}>items</div>
      <div style={{ backgroundColor: 'lightgrey' }}>are</div>
      <div style={{ backgroundColor: 'lightgrey' }}>spaced</div>
      <div style={{ backgroundColor: 'lightgrey' }}>out</div>
      <div style={{ backgroundColor: 'lightgrey' }}>and</div>
      <div style={{ backgroundColor: 'lightgrey' }}>when</div>
      <div style={{ backgroundColor: 'lightgrey' }}>they</div>
      <div style={{ backgroundColor: 'lightgrey' }}>wrap</div>
      <div style={{ backgroundColor: 'lightgrey' }}>there</div>
      <div style={{ backgroundColor: 'lightgrey' }}>is</div>
      <div style={{ backgroundColor: 'lightgrey' }}>equal</div>
      <div style={{ backgroundColor: 'lightgrey' }}>space</div>
      <div style={{ backgroundColor: 'lightgrey' }}>between</div>
      <div style={{ backgroundColor: 'lightgrey' }}>them</div>
      <div style={{ backgroundColor: 'lightgrey' }}>vertically.</div>
    </Inline>
  ))
  .add('right', () => (
    <Inline align="right">
      <div style={{ backgroundColor: 'lightgrey' }}>These</div>
      <div style={{ backgroundColor: 'lightgrey' }}>items</div>
      <div style={{ backgroundColor: 'lightgrey' }}>are</div>
      <div style={{ backgroundColor: 'lightgrey' }}>spaced</div>
      <div style={{ backgroundColor: 'lightgrey' }}>out</div>
      <div style={{ backgroundColor: 'lightgrey' }}>and</div>
      <div style={{ backgroundColor: 'lightgrey' }}>when</div>
      <div style={{ backgroundColor: 'lightgrey' }}>they</div>
      <div style={{ backgroundColor: 'lightgrey' }}>wrap</div>
      <div style={{ backgroundColor: 'lightgrey' }}>there</div>
      <div style={{ backgroundColor: 'lightgrey' }}>is</div>
      <div style={{ backgroundColor: 'lightgrey' }}>equal</div>
      <div style={{ backgroundColor: 'lightgrey' }}>space</div>
      <div style={{ backgroundColor: 'lightgrey' }}>between</div>
      <div style={{ backgroundColor: 'lightgrey' }}>them</div>
      <div style={{ backgroundColor: 'lightgrey' }}>vertically.</div>
    </Inline>
  ))
  .add('in a stack', () => (
    <Stack>
      <Inline>
        <div style={{ backgroundColor: 'lightgrey' }}>These</div>
        <div style={{ backgroundColor: 'lightgrey' }}>items</div>
        <div style={{ backgroundColor: 'lightgrey' }}>are</div>
        <div style={{ backgroundColor: 'lightgrey' }}>spaced</div>
        <div style={{ backgroundColor: 'lightgrey' }}>out</div>
        <div style={{ backgroundColor: 'lightgrey' }}>and</div>
        <div style={{ backgroundColor: 'lightgrey' }}>when</div>
        <div style={{ backgroundColor: 'lightgrey' }}>they</div>
        <div style={{ backgroundColor: 'lightgrey' }}>wrap</div>
        <div style={{ backgroundColor: 'lightgrey' }}>there</div>
        <div style={{ backgroundColor: 'lightgrey' }}>is</div>
        <div style={{ backgroundColor: 'lightgrey' }}>equal</div>
        <div style={{ backgroundColor: 'lightgrey' }}>space</div>
        <div style={{ backgroundColor: 'lightgrey' }}>between</div>
        <div style={{ backgroundColor: 'lightgrey' }}>them</div>
        <div style={{ backgroundColor: 'lightgrey' }}>vertically.</div>
      </Inline>
      <Inline>
        <div style={{ backgroundColor: 'lightgrey' }}>These</div>
        <div style={{ backgroundColor: 'lightgrey' }}>items</div>
        <div style={{ backgroundColor: 'lightgrey' }}>are</div>
        <div style={{ backgroundColor: 'lightgrey' }}>spaced</div>
        <div style={{ backgroundColor: 'lightgrey' }}>out</div>
        <div style={{ backgroundColor: 'lightgrey' }}>and</div>
        <div style={{ backgroundColor: 'lightgrey' }}>when</div>
        <div style={{ backgroundColor: 'lightgrey' }}>they</div>
        <div style={{ backgroundColor: 'lightgrey' }}>wrap</div>
        <div style={{ backgroundColor: 'lightgrey' }}>there</div>
        <div style={{ backgroundColor: 'lightgrey' }}>is</div>
        <div style={{ backgroundColor: 'lightgrey' }}>equal</div>
        <div style={{ backgroundColor: 'lightgrey' }}>space</div>
        <div style={{ backgroundColor: 'lightgrey' }}>between</div>
        <div style={{ backgroundColor: 'lightgrey' }}>them</div>
        <div style={{ backgroundColor: 'lightgrey' }}>vertically.</div>
      </Inline>
    </Stack>
  ));
