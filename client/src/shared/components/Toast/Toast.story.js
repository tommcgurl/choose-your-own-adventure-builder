import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import Button from '../Button';
import Toast from './Toast';

storiesOf('Components|Toast', module)
  .addParameters({ component: Toast })
  .add('default', () => {
    const [state, setState] = useState(null);

    function handlePopToastButton() {
      setState(null);
    }

    return (
      <div>
        <Button onClick={handlePopToastButton.bind(null)}>Pop Toast</Button>
        <Toast />
      </div>
    );
  });
