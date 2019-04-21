import React from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import styles from './StoryListItem.module.css';

import { addToLibrary, removeFromLibrary } from '../../actions/userActions';
import { fetchStory } from '../../actions/storyActions';
import { navigate } from '../../actions/pageActions';
import { READ } from '../../constants/routes';
import { getLibrary } from '../../selectors';

const StoryListItem = ({ story, dispatch, library }) => {
  const handleClickTitleLink = useCallback(() => {
    dispatch(fetchStory(story.id));
    dispatch(navigate(READ));
  }, [story.id]);

  const handleFaveChange = useCallback(
    e => {
      if (e.target.checked) {
        dispatch(addToLibrary(story));
      } else {
        dispatch(removeFromLibrary(story.id));
      }
    },
    [story.id],
  );

  return (
    <li className={styles.container}>
      <div>
        <input
          type="checkbox"
          checked={library.map(story => story.id).indexOf(story.id) >= 0}
          onChange={handleFaveChange}
        />
        <a href={`/#${story.id}`} onClick={handleClickTitleLink}>
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

const mapStateToProps = state => ({ library: getLibrary(state) });

export default connect(mapStateToProps)(StoryListItem);
