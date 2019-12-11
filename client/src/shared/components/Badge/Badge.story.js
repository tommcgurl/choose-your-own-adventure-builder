import { storiesOf } from '@storybook/react';
import React from 'react';
import Badge from './Badge';
import { Inline } from '../';

storiesOf('Components|Badge', module)
  .addParameters({ component: Badge })
  .add('default', () => <Badge>This is a badge 👍</Badge>)
  .add('dismissable', () => (
    <Badge
      dismissable={true}
      onClickDismiss={() => alert('dismiss clicked.')}>
      This is a dismissable badge
    </Badge>
  ))
  .add('many badges', () => (
    <Inline>
      <Badge>Tres Leches 🍰</Badge>
      <Badge>Big</Badge>
      <Badge>Div</Badge>
      <Badge>Energy</Badge>
      <Badge>⚡️</Badge>
    </Inline>
  ));
