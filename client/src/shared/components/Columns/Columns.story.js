import { storiesOf } from '@storybook/react';
import React from 'react';
import Columns from './Columns';

storiesOf('Layout|Columns', module)
  .addParameters({ component: Columns })
  .add('default', () => (
    <Columns>
      <div style={{ backgroundColor: 'lightgrey' }}>oh</div>
      <div style={{ backgroundColor: 'lightgrey' }}>hai</div>
      <div style={{ backgroundColor: 'lightgrey' }}>Mark</div>
    </Columns>
  ))
  .add('child with fixed width', () => (
    <Columns>
      <div style={{ backgroundColor: 'lightgrey', width: '100px' }}>oh</div>
      <div style={{ backgroundColor: 'lightgrey' }}>hai</div>
      <div style={{ backgroundColor: 'lightgrey' }}>Mark</div>
    </Columns>
  ));
