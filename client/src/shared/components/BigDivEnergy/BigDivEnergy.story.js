import { storiesOf } from '@storybook/react';
import React from 'react';
import BigDivEnergy from './BigDivEnergy';
import colors from './colors.module.css';
import spacing from './spacing.module.css';

storiesOf('Components|BigDivEnergy', module)
  .addParameters({ component: BigDivEnergy })
  .add('colors', () => {
    // This commented code is in the Storybook decorator,
    // but it is here to demonstrate the use of BigDivEnergy
    // const [nightMode, setNightMode] = useState(false);

    // function toggle() {
    //   setNightMode(state => !state);
    // }

    return (
      <div>
        {/*<BigDivEnergy nightMode={nightMode}>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={toggle}>Toggle Night Mode</Button>
    </div>*/}
        <div>var(--color-background)</div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor: 'var(--color-background)',
          }}
        >
          {Object.keys(colors)
            .filter(styleKey => styleKey.startsWith('--color'))
            .map(styleKey => (
              <div style={{ margin: '10px', width: '300px' }} key={styleKey}>
                <div>var({styleKey})</div>
                <div
                  style={{
                    backgroundColor: `var(${styleKey})`,
                    height: '150px',
                  }}
                />
              </div>
            ))}
        </div>
        {/*</BigDivEnergy>*/}
      </div>
    );
  })
  .add('spacing', () => {
    return (
      <div>
        {/*
      This commented code is in the Storybook decorator,
      but it is here to demonstrate the use of BigDivEnergy
      <BigDivEnergy>
      */}
        {Object.keys(spacing)
          .filter(styleKey => styleKey.startsWith('--spacing'))
          .map(styleKey => (
            <div key={styleKey}>
              <div>var({styleKey})</div>
              <div
                style={{
                  backgroundColor: 'lightgray',
                  padding: `var(${styleKey})`,
                  margin: `var(${styleKey})`,
                  border: 'solid',
                }}
              >
                This element has spacing applied to margin and padding.
              </div>
            </div>
          ))}
        {/*</BigDivEnergy>*/}
      </div>
    );
  });
