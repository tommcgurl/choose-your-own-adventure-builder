import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StarRating } from '../../../shared/components';
import Button from '../../../shared/components/Button';
import authService from '../../../shared/services/authService';
import { tokenSelector } from '../../../shared/store/selectors/index';
import * as routes from '../../constants/routes';
import adventureService from '../../services/readerAdventureService';
import readerReviewService from '../../services/readerReviewService';
import { addToLibrary } from '../../store/actions/libraryActions';
import { adventureSelector, progressSelector } from '../../store/selectors';
import BrowsingLayout from '../BrowsingLayout';
import * as styles from './Cover.module.css';

const Cover = ({
  adventure: adventureFromState,
  progress: progressFromState,
  addToLibrary,
  history,
  match,
  token,
}) => {
  const [adventure, setAdventure] = useState(adventureFromState);
  const [adventureReviews, setAdventureReviews] = useState([]);
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
    readerReviewService
      .fetchAdventureReviews(adventure.id)
      .then(response => setAdventureReviews(response));
  }, [adventure.id]);

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

  function leaveReviewClick() {
    console.log('leaving review');
  }

  // TODO: move the review stuff here

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
                <Button onClick={leaveReviewClick}>Leave Review</Button>
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
  { addToLibrary }
)(Cover);
