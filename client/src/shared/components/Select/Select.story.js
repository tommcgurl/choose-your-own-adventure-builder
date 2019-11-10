import { storiesOf } from '@storybook/react';
import React from 'react';
import Select from './Select';

storiesOf('Components|Select', module)
  .addParameters({ component: Select })
  .add('default', () => (
    <Select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
  ));
