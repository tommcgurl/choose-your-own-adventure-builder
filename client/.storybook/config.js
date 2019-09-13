import { addDecorator, configure } from '@storybook/react';
import React, { useState } from 'react';
import { BigDivEnergy, Button } from '../src/shared/components';

addDecorator(Story => {
  const [nightMode, setNightMode] = useState(false);
  function toggleNightMode() {
    setNightMode(state => !state);
  }
  return (
    <BigDivEnergy nightMode={nightMode}>
      <div style={{ textAlign: 'right' }}>
        <Button onClick={toggleNightMode}>Toggle Night Mode</Button>
      </div>
      <Story />
    </BigDivEnergy>
  );
});

configure(
  require.context('../src', true, /\.story\.(js|jsx|ts|tsx|mdx)$/),
  module
);
