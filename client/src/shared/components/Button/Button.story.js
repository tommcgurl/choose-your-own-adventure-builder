import { storiesOf } from '@storybook/react';
import React from 'react';
import { IoMdBeer } from 'react-icons/io';
import Inline from '../Inline/Inline';
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
      <IoMdBeer style={{ width: '100%', height: '100%' }} />
    </Button>
  ))
  .add('borderless', () => (
    <Button variant={VARIANTS.BORDERLESS}>Borderless</Button>
  ))
  .add('solid', () => <Button solid={true}>Solid</Button>)
  .add('many buttons', () => (
    <Inline>
      <Button>button1</Button>
      <Button>button2</Button>
      <Button>button3</Button>
      <Button>button4</Button>
      <Button>button5</Button>
      <Button>button6</Button>
    </Inline>
  ));
