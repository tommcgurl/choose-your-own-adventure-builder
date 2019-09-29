import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { popModal, popToast } from '../../../shared/components/';
import closeModal from '../../../shared/components/Modal/closeModal';
import * as routes from '../../constants/routes';
import readerReviewService from '../../services/readerReviewService';
import { removeFromLibrary } from '../../store/actions/libraryActions';
import ReviewEditor from '../ReviewEditor';
import styles from './AdventureListItem.module.css';

const AdventureListItem = ({ adventure, removeFromLibrary }) => {
  const handleRemove = () => {
    if (window.confirm('Remove from your library?')) {
      removeFromLibrary(adventure.id);
    }
  };

  const handleAddReviewClick = e => {
    popModal(<ReviewEditor submitHandler={handleReviewSubmitClick} />, {
      title: `Add your review of "${adventure.title}"`,
    });
  };

  const handleReviewSubmitClick = async (review, initializeRatingState) => {
    try {
      await readerReviewService.addReviewToStory(adventure.id, review);
      closeModal();
      initializeRatingState();
      popToast(`Review successfully submitted.`);
    } catch (err) {
      console.log(err.stack);
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
      <div className={styles.storyInfoText}>
        <div>
          <Link to={routes.COVER.replace(':adventureId', adventure.id)}>
            {adventure.title}
          </Link>
        </div>
        <div>
          {'by '}
          {adventure.authors.length === 1 ? (
            <AuthorLink username={adventure.authors[0].username} />
          ) : (
            adventure.authors
              .map(a => <AuthorLink username={a.username} />)
              .reduce((p, c) => `${p}, ${c}`)
          )}
        </div>
        <div>{`Genre: ${adventure.genre.name}`}</div>
        <div>
          {adventure.inLibrary ? (
            <React.Fragment>
              <button onClick={handleRemove}>Remove</button>
              <button onClick={handleAddReviewClick}>Add Review</button>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </li>
  );
};

const AuthorLink = ({ username }) => (
  <Link to={routes.PROFILE.replace(':username', username)}>{username}</Link>
);

export default connect(
  null,
  { removeFromLibrary }
)(AdventureListItem);
