import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  BUTTON_VARIANTS,
  Columns,
  Inline,
  Stack,
} from '../../../shared/components/';
import * as routes from '../../constants/routes';
import { removeFromLibrary } from '../../store/actions/libraryActions';
import {
  addReview,
  deleteReview,
  updateReview,
} from '../../store/actions/reviewActions';
import styles from './AdventureListItem.module.css';

const AdventureListItem = ({ adventure, removeFromLibrary }) => {
  const handleRemove = () => {
    if (window.confirm('Remove from your library?')) {
      removeFromLibrary(adventure.id);
    }
  };

  return (
    <Box className={styles.container}>
      <Stack padding="small">
        <Inline>
          <span>{adventure.genre.name}</span>
          <span>|</span>
          {adventure.authors.length === 1 ? (
            <AuthorLink username={adventure.authors[0].username} />
          ) : (
            adventure.authors
              .map(a => <AuthorLink username={a.username} />)
              .reduce((p, c) => `${p}, ${c}`)
          )}
        </Inline>
        <Columns>
          <Link
            className={styles.coverImageContainer}
            to={routes.COVER.replace(':adventureId', adventure.id)}
          >
            {adventure.coverImage && (
              <img
                src={adventure.coverImage}
                alt={adventure.title}
                className={styles.coverImage}
              />
            )}
          </Link>
          <Link to={routes.COVER.replace(':adventureId', adventure.id)}>
            {adventure.title}
          </Link>
        </Columns>
        <div>
          {adventure.inLibrary ? (
            <Button
              variant={BUTTON_VARIANTS.DESTRUCTIVE}
              onClick={handleRemove}
            >
              Remove from your library
            </Button>
          ) : null}
        </div>
      </Stack>
    </Box>
  );
};

const AuthorLink = ({ username }) => (
  <Link to={routes.PROFILE.replace(':username', username)}>{username}</Link>
);

export default connect(
  null,
  {
    removeFromLibrary,
    addReview,
    updateReview,
    deleteReview,
  }
)(AdventureListItem);
