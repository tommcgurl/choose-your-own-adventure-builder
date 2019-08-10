import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { publishedAdventuresSelector } from '../../store/selectors';

const PublishedAdventures = ({ adventures }) => {
  const publishedAdventureLink = adventure => {
    return (
      <li key={adventure.id}>
        <Link
          to={routes.PUBLISHED_ADVENTURE.replace(':adventureId', adventure.id)}
        >
          {adventure.title}
        </Link>
      </li>
    );
  };

  return <ul>{adventures.map(publishedAdventureLink)}</ul>;
};

const mapStateToProps = state => {
  return {
    adventures: publishedAdventuresSelector(state),
  };
};

export default connect(mapStateToProps)(PublishedAdventures);
