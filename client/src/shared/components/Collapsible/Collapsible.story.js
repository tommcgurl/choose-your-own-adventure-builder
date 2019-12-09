import { storiesOf } from '@storybook/react';
import React from 'react';
import Collapsible from './Collapsible';
import {
  Stack,
} from '../';
import styles from './Collapsible-story.module.css'

const headerComponent = (header, icon) => (
  <div className={styles.headerComponentContainer}>
    <h2>{header}</h2>
    <span role="img">{icon}</span>
  </div>
);

storiesOf('Layout|Collapsible', module)
  .addParameters({ component: Collapsible })
  .add('Not revealed.', () => {
    return (
      <Collapsible
        revealed={false}
        headerComponent={headerComponent('Good old family Christmas!', '🎄🎅')}>
        <p>Threshold of hell!</p>
      </Collapsible>
    );
  })
  .add('Revealed.', () => {
    return (
      <Collapsible
        revealed={true}
        headerComponent={headerComponent('Why is the carpet all wet Todd!?', '📻💧')}>
        <p>I don't KNOW MARGO!</p>
      </Collapsible>
    );
  })
  .add('Stacked.', () => (
    <Stack>
      <Collapsible
        key="1"
        revealed={true}
        headerComponent={headerComponent('Can I get you anything Eddie!?', '🍺')}>
        <p>Take you out in the middle of nowhere, leave you for dead.</p>
      </Collapsible>
      <Collapsible
        key="2"
        revealed={true}
        headerComponent={headerComponent('I simply solved a problem.', '⚰️🌲')}>
        <p>We needed a coffin!.. ahem.. a tree.</p>
      </Collapsible>
    </Stack>
  ))
  .add('With onToggleReveal handler', () => {
    return (
      <Collapsible
        revealed={false}
        onToggleReveal={({ revealed }) => alert(`revealed? ${revealed}`)}
        headerComponent={headerComponent('Toggle me!', '')}>
        <p>Good Job!</p>
      </Collapsible>
    );
  })
