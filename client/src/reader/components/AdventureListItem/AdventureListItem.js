import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { popModal, popToast } from '../../../shared/components/';
import closeModal from '../../../shared/components/Modal/closeModal';
import * as routes from '../../constants/routes';
import { removeFromLibrary } from '../../store/actions/libraryActions';
import { addReview } from '../../store/actions/reviewActions';
import reviewsSelector from '../../store/selectors/reviewsSelector';
import ReviewEditor from '../ReviewEditor';
import styles from './AdventureListItem.module.css';

const AdventureListItem = ({
  adventure,
  removeFromLibrary,
  addReview,
  reviews,
}) => {
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

  const handleEditReviewClick = () => {
    const review = reviews.find(r => r.adventureId === adventure.id);
    const headline = review.headline;
    const rating = review.rating;
    const reviewBody = review.reviewBody;
    popModal(
      <ReviewEditor
        submitHandler={handleReviewEditClick}
        headline={headline}
        rating={rating}
        reviewBody={reviewBody}
      />
    );
  };

  const handleReviewSubmitClick = (review, initializeRatingState) => {
    try {
      //await readerReviewService.addReviewToStory(adventure.id, review);
      addReview(adventure.id, review);
      closeModal();
      initializeRatingState();
      popToast(`Review successfully submitted.`);
    } catch (err) {
      console.log(err.stack);
    }
  };

  const handleReviewEditClick = () => {
    // TODO call the updateReview redux action
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
              {!reviews.find(r => r.adventureId === adventure.id) ? (
                <button onClick={handleAddReviewClick}>Add Review</button>
              ) : (
                <button onClick={handleEditReviewClick}>Edit Review</button>
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
  }
)(AdventureListItem);
