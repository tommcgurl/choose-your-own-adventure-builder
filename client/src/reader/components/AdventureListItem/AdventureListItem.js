import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  BUTTON_VARIANTS,
  popModal,
  popToast,
} from '../../../shared/components/';
import closeModal from '../../../shared/components/Modal/closeModal';
import * as routes from '../../constants/routes';
import { removeFromLibrary } from '../../store/actions/libraryActions';
import {
  addReview,
  deleteReview,
  updateReview,
} from '../../store/actions/reviewActions';
import reviewsSelector from '../../store/selectors/reviewsSelector';
import ReviewEditor from '../ReviewEditor';
import styles from './AdventureListItem.module.css';

const AdventureListItem = ({
  adventure,
  removeFromLibrary,
  addReview,
  updateReview,
  deleteReview,
  reviews,
}) => {
  const handleRemove = () => {
    if (window.confirm('Remove from your library?')) {
      removeFromLibrary(adventure.id);
    }
  };

  const handleAddReviewClick = e => {
    popModal(
      <ReviewEditor
        submitHandler={handleAddReviewSubmitClick}
        adventureId={adventure.id}
      />,
      {
        title: `Add your review of "${adventure.title}"`,
      }
    );
  };

  const handleEditReviewClick = () => {
    const review = reviews.find(r => r.adventureId === adventure.id);
    popModal(
      <ReviewEditor
        submitHandler={handleEditReviewSaveClick}
        adventureId={adventure.id}
        review={review}
        deleteHandler={handleDeleteReviewClick}
      />
    );
  };

  const handleAddReviewSubmitClick = (review, initializeReviewState) => {
    try {
      addReview(adventure.id, review);
      closeModal();
      initializeReviewState();
      popToast(`Review successfully submitted.`);
    } catch (err) {
      console.log(err.stack);
    }
  };

  const handleEditReviewSaveClick = (updatedReview, initializeReviewState) => {
    try {
      updateReview(updatedReview);
      closeModal();
      initializeReviewState();
      popToast(`Review successfully updated.`);
    } catch (err) {
      console.log(err.stack);
    }
  };

  const handleDeleteReviewClick = () => {
    if (window.confirm('Permanently delete your review?')) {
      try {
        const review = reviews.find(r => r.adventureId === adventure.id);
        deleteReview(review.id);
        closeModal();
        popToast(`Review successfully deleted.`);
      } catch (err) {
        console.log(err.stack);
      }
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
              <Button
                variant={BUTTON_VARIANTS.DESTRUCTIVE}
                onClick={handleRemove}
              >
                Remove from your library
              </Button>
              {reviews.find(r => r.adventureId === adventure.id) ? (
                <Button onClick={handleEditReviewClick}>Edit Review</Button>
              ) : (
                <Button
                  variant={BUTTON_VARIANTS.ACTION}
                  onClick={handleAddReviewClick}
                >
                  Add Review
                </Button>
              )}
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

const mapStateToProps = state => {
  return {
    reviews: reviewsSelector(state),
  };
};

export default connect(
  mapStateToProps,
  {
    removeFromLibrary,
    addReview,
    updateReview,
    deleteReview,
  }
)(AdventureListItem);
