import React from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import styles from './StoryListItem.module.css';

import { fetchStory } from '../../actions/storyActions';
import { navigate } from '../../actions/pageActions';
import { READ } from '../../constants/routes';

const StoryListItem = ({ story, dispatch }) => {
  const handleClickTitleLink = useCallback(() => {
    dispatch(fetchStory(story.id));
    dispatch(navigate(READ));
  }, [story.id]);

  return (
    <li className={styles.container}>
      <div>
        <a href="/#" onClick={handleClickTitleLink}>
          {story.title}
        </a>
        {story.tags && story.tags.length
          ? ` Tags: ${[...story.tags].join(', ')}`
          : ''}
      </div>
      <div>by {story.author}</div>
    </li>
  );
};

export default connect()(StoryListItem);
