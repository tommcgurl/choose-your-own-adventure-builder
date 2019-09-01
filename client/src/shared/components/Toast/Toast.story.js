import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from '../Button';
import Toast, { popToast, VARIANTS } from './index';

storiesOf('Components|Toast', module)
  .addParameters({ component: Toast })
  .add('default (info)', () => {
    // import Toast, { popToast } from './Toast';

    function handlePopToastButton() {
      popToast(`Oh hai! I'm a notification.`);
    }

    return (
      <div>
        <Button onClick={handlePopToastButton.bind(null)}>Pop Toast</Button>
        <Toast />
      </div>
    );
  })
  .add('error', () => {
    // import Toast, { popToast, VARIANTS } from './Toast';

    function handlePopToastButton() {
      popToast(`Oh hai! I'm an ERROR!`, VARIANTS.ERROR);
    }

    return (
      <div>
        <Button onClick={handlePopToastButton.bind(null)}>Pop Toast</Button>
        <Toast />
      </div>
    );
  })
  .add('lots of text', () => {
    // import Toast, { popToast } from './Toast';

    function handlePopToastButton() {
      popToast(
        `Oh hai! This is what I look like when I have lots of text. Is this enough text? Gee I hope it is. Oh well. Here goes.`
      );
    }

    return (
      <div>
        <Button onClick={handlePopToastButton.bind(null)}>Pop Toast</Button>
        <Toast />
      </div>
    );
  });
