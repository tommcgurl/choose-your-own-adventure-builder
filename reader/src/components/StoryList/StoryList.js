import React from 'react';
import { connect } from 'react-redux';

import styles from './StoryList.module.css';
import StoryListItem from '../StoryListItem';

import { getVisibleStories } from '../../selectors';

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

const mapStateToProps = state => {
  return {
    stories: getVisibleStories(state),
  };
};

export default connect(mapStateToProps)(StoryList);
