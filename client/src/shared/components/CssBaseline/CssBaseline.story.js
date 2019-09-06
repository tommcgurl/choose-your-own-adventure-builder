import { storiesOf } from '@storybook/react';
import React from 'react';
import theme from '../../constants/themeValues';
import getCustomCSSProperties from './getCustomCSSProperties';

const PaletteSquare = ({ property }) => {
  return (
    <div style={{ margin: '10px', width: '200px' }}>
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

storiesOf('Theme|CssBaseline', module).add('colors', () => {
  const cssProps = getCustomCSSProperties(theme).filter(prop =>
    prop.propertyName.startsWith('--color')
  );
  return (
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
  );
});
