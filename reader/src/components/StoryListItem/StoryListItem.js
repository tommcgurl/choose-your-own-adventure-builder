import React from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import styles from './StoryListItem.module.css';

import { addToLibrary, removeFromLibrary } from '../../actions/userActions';
import { fetchAdventure } from '../../actions/adventureActions';
import { navigate } from '../../actions/pageActions';
import { READ } from '../../constants/routes';
import { getLibrary } from '../../selectors';

const StoryListItem = ({
  story,
  library,
  fetchAdventure,
  addToLibrary,
  removeFromLibrary,
}) => {
  const handleClickTitleLink = useCallback(() => {
    fetchAdventure(story.id);
    navigate(READ);
  }, [story.id]);

  const handleFaveChange = useCallback(
    e => {
      if (e.target.checked) {
        addToLibrary(story);
      } else {
        removeFromLibrary(story.id);
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

const mapDispatchToProps = dispatch => {
  return {
    fetchAdventure: id => {
      dispatch(fetchAdventure(id));
    },
    navigate: route => {
      dispatch(navigate(route));
    },
    addToLibrary: story => {
      dispatch(addToLibrary(story));
    },
    removeFromLibrary: id => {
      dispatch(removeFromLibrary(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoryListItem);
