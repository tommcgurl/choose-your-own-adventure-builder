import { storiesOf } from '@storybook/react';
import React from 'react';
import { IoIosBeer } from 'react-icons/io';
import Button, { VARIANTS } from './Button';

storiesOf('Components|Button', module)
  .addParameters({ component: Button })
  .add('default', () => <Button>default button!</Button>)
  .add('destructive', () => (
    <Button variant={VARIANTS.DESTRUCTIVE}>destructive button!</Button>
  ))
  .add('action', () => (
    <Button variant={VARIANTS.ACTION}>action button!</Button>
  ))
  .add('icon', () => (
    <Button variant={VARIANTS.ICON}>
      <IoIosBeer />
    </Button>
  ))
  .add('borderless', () => (
    <Button variant={VARIANTS.BORDERLESS}>Borderless</Button>
  ))
  .add('solid', () => <Button solid={true}>Solid</Button>);
