import React from 'react';
import { IoMdBookmarks } from 'react-icons/io';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  BUTTON_VARIANTS,
  Columns,
  Inline,
  Stack,
  StarRating,
} from '../../../shared/components/';
import * as routes from '../../constants/routes';
import { removeFromLibrary } from '../../store/actions/libraryActions';
import {
  addReview,
  deleteReview,
  updateReview,
} from '../../store/actions/reviewActions';
import UserLink from '../UserLink/UserLink';
import styles from './AdventureList.module.css';

const AdventureList = ({ adventures }) => {
  return (
    <Box>
      <Stack id="adventure-list" padding="none" divider>
        {adventures.map(adventure => (
          <AdventureListItem key={adventure.id} adventure={adventure} />
        ))}
      </Stack>
    </Box>
  );
};

const AdventureListItem = connect(null, {
  removeFromLibrary,
  addReview,
  updateReview,
  deleteReview,
})(({ adventure, removeFromLibrary }) => {
  const handleRemove = () => {
    if (window.confirm('Remove from your library?')) {
      removeFromLibrary(adventure.id);
    }
  };

  return (
    <Box>
      <Stack padding="small">
        <Inline>
          <span>{adventure.genre.name}</span>
          <span>|</span>
          {adventure.authors.length === 1 ? (
            <UserLink username={adventure.authors[0].username} />
          ) : (
            adventure.authors
              .map(a => <UserLink username={a.username} />)
              .reduce((p, c) => `${p}, ${c}`)
          )}
        </Inline>
        <Columns>
          {adventure.coverImage && (
            <Link
              className={styles.coverImageContainer}
              to={routes.COVER.replace(':adventureId', adventure.id)}
            >
              <img
                src={adventure.coverImage}
                alt={adventure.title}
                className={styles.coverImage}
              />
            </Link>
          )}
          <Stack>
            <Link to={routes.COVER.replace(':adventureId', adventure.id)}>
              <span>{adventure.title}</span>
            </Link>
            <Inline>
              <span>
                {adventure.popularity}
                <IoMdBookmarks style={{ verticalAlign: 'middle' }} />
              </span>
              {adventure.rating && (
                <span>
                  <StarRating rating={adventure.rating} />
                </span>
              )}
            </Inline>
          </Stack>
        </Columns>
        {adventure.inLibrary ? (
          <Button variant={BUTTON_VARIANTS.DESTRUCTIVE} onClick={handleRemove}>
            Remove
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
});

export default AdventureList;
