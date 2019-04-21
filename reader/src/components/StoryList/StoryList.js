import React from 'react';

import styles from './StoryList.module.css';

import StoryListItem from '../StoryListItem';

const StoryList = ({ stories }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {stories.map(story => (
          <StoryListItem key={story.id} story={story} />
        ))}
      </ul>
    </div>
  );
};

export default StoryList;
