import { storiesOf } from '@storybook/react';
import React from 'react';
import BigDivEnergy from './BigDivEnergy';
import styles from './colors.module.css';

storiesOf('Components|BigDivEnergy', module)
  .addParameters({ component: BigDivEnergy })
  .add('colors', () => {
    // This commented code is in the Storybook decorator,
    // but it is here to demonstrate the used of BigDivEnergy
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
          {Object.keys(styles)
            .filter(styleKey => styleKey.startsWith('--color'))
            .map(styleKey => (
              <div style={{ margin: '10px', width: '300px' }} key={styleKey}>
                <div style={{ color: 'var(--color-font)' }}>
                  var({styleKey})
                </div>
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
  });
