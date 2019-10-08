import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { popModal, popToast } from '../../../shared/components/';
import closeModal from '../../../shared/components/Modal/closeModal';
import * as routes from '../../constants/routes';
import { removeFromLibrary } from '../../store/actions/libraryActions';
import { addReview, updateReview } from '../../store/actions/reviewActions';
import reviewsSelector from '../../store/selectors/reviewsSelector';
import ReviewEditor from '../ReviewEditor';
import styles from './AdventureListItem.module.css';

const AdventureListItem = ({
  adventure,
  removeFromLibrary,
  addReview,
  updateReview,
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
    const { id, headline, rating, reviewBody } = review;
    popModal(
      <ReviewEditor
        submitHandler={handleEditReviewSaveClick}
        adventureId={adventure.id}
        reviewId={id}
        headline={headline}
        rating={rating}
        reviewBody={reviewBody}
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

  // TODO Move deleting reviews to here to properly handle
  // keeping state updated, passing down delete function, etc.

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
              {reviews.find(r => r.adventureId === adventure.id) ? (
                <button onClick={handleEditReviewClick}>Edit Review</button>
              ) : (
                <button onClick={handleAddReviewClick}>Add Review</button>
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
  }
)(AdventureListItem);
