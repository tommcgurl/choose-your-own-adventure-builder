import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { removeFromLibrary } from '../../store/actions/libraryActions';
import styles from './AdventureListItem.module.css';

const AdventureListItem = ({ adventure, removeFromLibrary }) => {
  const handleRemove = () => {
    if (window.confirm('Remove from your library?')) {
      removeFromLibrary(adventure.id);
    }
  };

  return (
    <li className={styles.container}>
      <div>
        {adventure.coverImage && (
          <img
            src={adventure.coverImage}
            alt={adventure.title}
            className={styles.coverImage}
          />
        )}
      </div>
      <div>
        <div>
          <Link to={routes.COVER.replace(':adventureId', adventure.id)}>
            {adventure.title}
          </Link>
        </div>
        <div>
          {'by '}
          {adventure.authors.length === 1
            ? adventure.authors[0].username
            : adventure.authors
                .map(a => a.username)
                .reduce((p, c) => `${p}, ${c}`)}
        </div>
        <div>{`Genre: ${adventure.genre.name}`}</div>
        <div>
          {adventure.inLibrary ? (
            <button onClick={handleRemove}>Remove</button>
          ) : null}
        </div>
      </div>
    </li>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromLibrary: id => {
      dispatch(removeFromLibrary(id));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AdventureListItem);
