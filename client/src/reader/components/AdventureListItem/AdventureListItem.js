import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { fetchAdventure } from '../../store/actions/adventureActions';
import styles from './AdventureListItem.module.css';

const AdventureListItem = ({ adventure, fetchAdventure }) => {
  const handleClickTitleLink = () => {
    fetchAdventure(adventure.id);
  };

  return (
    <li className={styles.container}>
      <div>
        <Link to={routes.READ} onClick={handleClickTitleLink}>
          {adventure.title}
        </Link>
      </div>
      <div>
        by{' '}
        {adventure.authors.length === 1
          ? adventure.authors[0].username
          : adventure.authors
              .map(a => a.username)
              .reduce((p, c) => `${p}, ${c}`)}
      </div>
      <div>{`Genre: ${adventure.genre.name}`}</div>
    </li>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAdventure: id => {
      dispatch(fetchAdventure(id));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AdventureListItem);
