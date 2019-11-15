import { storiesOf } from '@storybook/react';
import React from 'react';
import Input from './Input';

storiesOf('Components|Input', module)
  .addParameters({ component: Input })
  .add('default', () => <Input />);
