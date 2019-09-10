import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { toggleNightMode } from '../../../reader/store/actions/userSettingsActions';

const PaletteSquare = ({ property }) => {
  return (
    <div style={{ margin: '10px', width: '300px' }}>
      <div>var({property.propertyName})</div>
      <div>{property.value}</div>
      <div
        style={{
          backgroundColor: property.value,
          height: '150px',
        }}
      />
    </div>
  );
};

storiesOf('Theme|CssBaseline', module).add('colors', ({ state, dispatch }) => {
  const [cssProps, setCssProps] = useState([]);
  useEffect(() => {
    const rootEl = document.getElementById('root');
    const props = Array.from(rootEl.style)
      .filter(style => style.startsWith('--color'))
      .map(style => ({
        propertyName: style,
        value: rootEl.style.getPropertyValue(style),
      }));
    setCssProps(props);
  }, [state.reader.userSettings.nightMode]);

  function toggle() {
    dispatch(toggleNightMode());
  }

  return (
    <div>
      <Button onClick={toggle}>Toggle</Button>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {cssProps.map(prop => (
          <PaletteSquare key={prop.propertyName} property={prop} />
        ))}
      </div>
    </div>
  );
});
