import React from 'react';
import { storiesOf } from '@storybook/react';
import Button, { TYPES } from './Button';

storiesOf('Components|Button', module)
  .addParameters({ component: Button })
  .add('default', () => (
    <Button>default button!</Button>
  ))
  .add('destructive', () => (
    <Button type={TYPES.DESTRUCTIVE}>
      destructive button!
    </Button>
  ))
  .add('action', () => (
    <Button type={TYPES.ACTION}>
      action button!
    </Button>
  ))