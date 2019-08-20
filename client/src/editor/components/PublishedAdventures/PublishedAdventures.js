import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import draftService from '../../services/draftService';

const PublishedAdventures = props => {
  const [adventures, setAdventures] = useState([]);
  useEffect(() => {
    draftService.getPublishedAdventures().then(adventures => {
      setAdventures(adventures);
    });
  }, []);

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

export default PublishedAdventures;
