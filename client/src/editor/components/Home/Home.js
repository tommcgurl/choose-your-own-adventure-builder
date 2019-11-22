import React from 'react';
import { Box, Inline, Stack, Columns } from '../../../shared/components';
import * as styles from './Home.module.css';
import Drafts from '../Drafts/Drafts';
import PublishedAdventures from '../PublishedAdventures/PublishedAdventures';

const Home = props => {
  return (
    <Box>
      <Box shadow className={styles.titleContainer}>
        <Inline align="center">
          <h1 className={styles.title}>Embark</h1>
        </Inline>
        <Inline align="center">
          <h2>A "choose your own adventure" app</h2>
        </Inline>
      </Box>
      <Stack align="center">
        <Box shadow className={styles.module}>
          <h3>Your Drafts</h3>
          <Inline style={{ textAlign: 'left' }} align="left">
            <Drafts />
          </Inline>
        </Box>
        <Box shadow className={styles.module}>
          <h3>Your Published Adventures</h3>
          <Inline align="left">
            <PublishedAdventures />
          </Inline>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
