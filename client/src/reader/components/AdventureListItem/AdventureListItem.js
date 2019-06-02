import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdventure } from '../../actions/adventureActions';
import * as routes from '../../constants/routes';
import styles from './AdventureListItem.module.css';

const AdventureListItem = ({ adventure, fetchAdventure }) => {
  const handleClickTitleLink = () => {
    fetchAdventure(adventure.id);
  };

  return (
    <li className={styles.container}>
      <div>
        <Link to={routes.ROOT + routes.READ} onClick={handleClickTitleLink}>
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
