import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './StoryList.module.css';
import StoryListItem from '../StoryListItem/StoryListItem';

import { getVisibleStories } from './selectors';

const StoryList = ({ stories, fetchStories }) => {
  useEffect(() => {
    fetchStories();
  }, []);
  return (
    <ul className={styles.list}>
      {stories.map(story => (
        <StoryListItem key={story.id} story={story} />
      ))}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    stories: getVisibleStories(state),
  };
};

export default connect(mapStateToProps)(StoryList);
