import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdventure } from '../../actions/adventureActions';
import { addToLibrary, removeFromLibrary } from '../../actions/userActions';
import * as routes from '../../constants/routes';
import styles from './AdventureListItem.module.css';

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
        <Link to={routes.READ} onClick={handleClickTitleLink}>
          {adventure.title}
        </Link>
        {adventure.tags && adventure.tags.length
          ? ` Tags: ${[...adventure.tags].join(', ')}`
          : ''}
      </div>
      <div>
        by{' '}
        {adventure.authors.length === 1
          ? adventure.authors[0].username
          : adventure.authors
              .map(a => a.username)
              .reduce((p, c) => `${p}, ${c}`)}
      </div>
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
  mapDispatchToProps
)(AdventureListItem);
