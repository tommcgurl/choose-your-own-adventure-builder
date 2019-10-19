import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { popModal, popToast, StarRating } from '../../../shared/components';
import Button from '../../../shared/components/Button';
import { closeModal } from '../../../shared/components/Modal';
import authService from '../../../shared/services/authService';
import { tokenSelector } from '../../../shared/store/selectors/index';
import * as routes from '../../constants/routes';
import adventureService from '../../services/readerAdventureService';
import readerReviewService from '../../services/readerReviewService';
import { addToLibrary } from '../../store/actions/libraryActions';
import {
  addReview,
  deleteReview,
  updateReview,
} from '../../store/actions/reviewActions';
import { adventureSelector, progressSelector } from '../../store/selectors';
import BrowsingLayout from '../BrowsingLayout';
import ReviewEditor from '../ReviewEditor';
import * as styles from './Cover.module.css';

const Cover = ({
  adventure: adventureFromState,
  progress: progressFromState,
  addToLibrary,
  history,
  match,
  token,
  addReview,
  updateReview,
  deleteReview,
}) => {
  // TODO probably should have the adventure's reviews in state?
  const [adventure, setAdventure] = useState(adventureFromState);
  const [adventureReviews, setAdventureReviews] = useState([]);

  const getReviews = () => {
    readerReviewService
      .fetchAdventureReviews(adventure.id)
      .then(response => setAdventureReviews(response));
  };

  useEffect(() => {
    if (!adventure) {
      if (match && match.params && match.params.adventureId) {
        adventureService
          .getAdventure(match.params.adventureId)
          .then(adventure => {
            if (adventure) {
              setAdventure(adventure);
            } else {
              bail();
            }
          })
          .catch(() => bail());
      } else {
        bail();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // TODO update local state reviews when global state reviews change? Jesus christ
  }, []);

  function bail() {
    history.replace(routes.NOT_FOUND);
  }

  const { id, title, authors, blurb, coverImage, genre } = adventure || {};

  function onStartAdventureClick() {
    addToLibrary(adventure);
    history.push(routes.READ.replace(':adventureId', id));
  }

  function onContinueClick() {
    history.push(routes.READ.replace(':adventureId', id));
  }

  function addReviewSubmitHandler(newReview, initializeReviewEditor) {
    try {
      addReview(adventure.id, newReview);
    } catch (err) {
      console.log(err.stack);
    } finally {
      closeModal();
      popToast('Review successfully added');
      initializeReviewEditor();
      getReviews();
    }
  }

  function leaveReviewClick() {
    popModal(<ReviewEditor submitHandler={addReviewSubmitHandler} />);
  }

  // TODO add updating and deleting reviews

  return (
    <BrowsingLayout>
      {adventure ? (
        <div className={styles.coverContainer}>
          <h1>{title}</h1>
          <p>
            Created by{' '}
            <strong>
              {authors.length > 1
                ? authors.map(a => a.username).join(', ')
                : authors[0].username}
            </strong>
          </p>
          <div>
            <img
              className={styles.coverImage}
              alt="story cover"
              src={coverImage}
            />
          </div>
          <div className={styles.genre}>
            <p>
              This adventure falls into the <strong>{genre.name}</strong> genre.
            </p>
          </div>
          <div className={styles.descriptionContainer}>
            <p>Blurb:</p>
            <p className={styles.description}>{blurb}</p>
          </div>
          <div>
            <Button
              onClick={onStartAdventureClick}
              disabled={!authService.isAuthenticated(token)}
            >
              {authService.isAuthenticated(token)
                ? Array.isArray(progressFromState) && progressFromState.length
                  ? 'Start Over'
                  : 'Embark'
                : 'Login to Embark'}
            </Button>
            {Array.isArray(progressFromState) && progressFromState.length && (
              <React.Fragment>
                <Button onClick={onContinueClick}>Continue</Button>
                {/* TODO change button text depending on if review from user already exists */}
                {!adventureReviews.find(
                  r => r.adventureId === adventureFromState.id
                ) && <Button onClick={leaveReviewClick}>Leave Review</Button>}
              </React.Fragment>
            )}
          </div>
          <div>
            {adventureReviews.length > 0 && (
              <div>
                <h2>Read reviews for this adventure</h2>
                <div className={styles.reviewsContainer}>
                  {adventureReviews.map(r => {
                    return (
                      <div className={styles.reviewBlock} key={r.id}>
                        <p>
                          <strong>Review by:</strong> {r.user.username}
                        </p>
                        <p>
                          <strong>Rating:</strong>
                          <StarRating rating={r.rating} isEditable={false} />
                        </p>
                        <p>
                          <strong>Headline:</strong> {r.headline}
                        </p>
                        <p>
                          <strong>Review:</strong>
                        </p>
                        <p>{r.reviewBody}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </BrowsingLayout>
  );
};

const mapStateToProps = (state, { match }) => {
  let props = {
    token: tokenSelector(state),
  };
  if (match && match.params && match.params.adventureId) {
    props = {
      ...props,
      adventure: adventureSelector(state)(match.params.adventureId),
      progress: progressSelector(state)(match.params.adventureId),
    };
  }
  return props;
};

export default connect(
  mapStateToProps,
  { addToLibrary, addReview, updateReview, deleteReview }
)(Cover);
