import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from '../Button';
import Actions from './Actions';

storiesOf('Layout|Actions', module)
  .addParameters({ component: Actions })
  .add('default', () => (
    <Actions>
      <Button>These</Button>
      <Button>buttons</Button>
      <Button>will</Button>
      <Button>stack</Button>
      <Button>when</Button>
      <Button>their</Button>
      <Button>container</Button>
      <Button>isn't</Button>
      <Button>wide</Button>
      <Button>enough</Button>
    </Actions>
  ))
  .add('center aligned', () => (
    <Actions align="center">
      <Button>These</Button>
      <Button>buttons</Button>
      <Button>will</Button>
      <Button>stack</Button>
      <Button>when</Button>
      <Button>their</Button>
      <Button>container</Button>
      <Button>isn't</Button>
      <Button>wide</Button>
      <Button>enough</Button>
    </Actions>
  ));
