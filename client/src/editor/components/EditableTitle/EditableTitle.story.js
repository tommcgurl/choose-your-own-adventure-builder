import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import EditableTitle from './EditableTitle';

storiesOf('Components|EditableTitle', module)
  .addParameters({ component: EditableTitle })
  .add('default', () => (
    <EditableTitle title="Young Thugs" />
  ));