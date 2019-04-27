import React from 'react';
import { connect } from 'react-redux';
import styles from './AdventureListItem.module.css';

import { addToLibrary, removeFromLibrary } from '../../actions/userActions';
import { fetchAdventure } from '../../actions/adventureActions';

const AdventureListItem = ({
  adventure,
  fetchAdventure,
  addToLibrary,
  removeFromLibrary,
}) => {
  const handleClickTitleLink = () => {
    fetchAdventure(adventure.id);
  };

  const handleFaveChange = e => {
    if (e.target.checked) {
      addToLibrary(adventure);
    } else {
      removeFromLibrary(adventure.id);
    }
  };

  return (
    <li className={styles.container}>
      <div>
        <input
          type="checkbox"
          checked={adventure.inLibrary}
          onChange={handleFaveChange}
        />
        <a href={`/#${adventure.id}`} onClick={handleClickTitleLink}>
          {adventure.title}
        </a>
        {adventure.tags && adventure.tags.length
          ? ` Tags: ${[...adventure.tags].join(', ')}`
          : ''}
      </div>
      <div>by {adventure.author}</div>
    </li>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAdventure: id => {
      dispatch(fetchAdventure(id));
    },
    addToLibrary: adventure => {
      dispatch(addToLibrary(adventure));
    },
    removeFromLibrary: id => {
      dispatch(removeFromLibrary(id));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(AdventureListItem);
