import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import Button from '../Button';
import Toast, { toast } from './Toast';

storiesOf('Components|Toast', module)
  .addParameters({ component: Toast })
  .add('default', () => {
    function handlePopToastButton() {
      toast('o hai!');
    }

    return (
      <div>
        <Button onClick={handlePopToastButton.bind(null)}>Pop Toast</Button>
        <Toast />
      </div>
    );
  });
