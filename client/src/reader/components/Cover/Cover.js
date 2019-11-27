import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Columns,
  popModal,
  popToast,
  Stack,
  StarRating,
} from '../../../shared/components';
import Actions from '../../../shared/components/Actions/Actions';
import { closeModal } from '../../../shared/components/Modal';
import { isAuthenticated } from '../../../shared/services/authService';
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
import {
  adventureSelector,
  progressSelector,
  reviewsSelector,
} from '../../store/selectors';
import BrowsingLayout from '../BrowsingLayout';
import ReviewEditor from '../ReviewEditor';
import UserLink from '../UserLink';
import styles from './Cover.module.css';

const Cover = ({
  adventure: adventureFromState,
  progress: progressFromState,
  reviews,
  addToLibrary,
  history,
  match,
  token,
  addReview,
  updateReview,
  deleteReview,
}) => {
  const [adventure, setAdventure] = useState(adventureFromState);

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

  function bail() {
    history.replace(routes.NOT_FOUND);
  }

  const { id, title, authors, blurb, coverImage, genre } = adventure || {};

  const [adventureReviews, setAdventureReviews] = useState([]);

  useEffect(() => {
    const getAdventureReviews = async adventureId => {
      const fetchedReviews = await readerReviewService.fetchAdventureReviews(
        adventureId
      );
      setAdventureReviews(fetchedReviews);
    };

    if (id) {
      getAdventureReviews(id);
    }
  }, [reviews, id]);

  function onStartAdventureClick() {
    addToLibrary(adventure);
    history.push(routes.READ.replace(':adventureId', id));
  }

  function onContinueClick() {
    history.push(routes.READ.replace(':adventureId', id));
  }

  function addReviewSubmitHandler(newReview, initializeReviewEditor) {
    try {
      addReview(id, newReview);
    } catch (err) {
      console.log(err.stack);
    } finally {
      closeModal();
      popToast('Review successfully added');
      initializeReviewEditor();
    }
  }

  function editReviewSubmitHandler(updatedReview, initializeReviewEditor) {
    try {
      updateReview(id, updatedReview);
    } catch (err) {
      console.log(err.stack);
    } finally {
      closeModal();
      popToast('Review successfully updated');
      initializeReviewEditor();
    }
  }

  function deleteReviewHandler(initializeReviewEditor) {
    try {
      deleteReview(reviews[id].id);
    } catch (err) {
      console.log(err.stack);
    } finally {
      closeModal();
      popToast('Review successfully deleted');
      initializeReviewEditor();
    }
  }

  function leaveReviewClick() {
    popModal(<ReviewEditor submitHandler={addReviewSubmitHandler} />);
  }

  function editReviewClick() {
    popModal(
      <ReviewEditor
        submitHandler={editReviewSubmitHandler}
        deleteHandler={deleteReviewHandler}
        review={reviews[id]}
      />
    );
  }

  const hasProgress =
    Array.isArray(progressFromState) && progressFromState.length;

  return (
    <BrowsingLayout>
      {adventure ? (
        <Fragment>
          <Stack className={styles.mobileCover} divider>
            <Box>
              <Stack align="center">
                <img
                  className={styles.coverImage}
                  alt="story cover"
                  src={coverImage}
                />
                <Box component="h1" padding="none" className={styles.title}>
                  {title}
                </Box>
                <strong>{genre.name}</strong>
                <div>
                  Created by{' '}
                  {authors.length > 1 ? (
                    authors
                      .map(a => <UserLink username={a.username} />)
                      .join(', ')
                  ) : (
                    <UserLink username={authors[0].username} />
                  )}
                </div>
                <Actions align="center">
                  {hasProgress && (
                    <Button onClick={onContinueClick}>Continue</Button>
                  )}
                  <Button
                    onClick={onStartAdventureClick}
                    disabled={!isAuthenticated(token)}
                  >
                    {isAuthenticated(token)
                      ? hasProgress
                        ? 'Start Over'
                        : 'Embark'
                      : 'Login to Embark'}
                  </Button>
                  {hasProgress &&
                    (reviews[id] ? (
                      <Button onClick={editReviewClick}>Edit Review</Button>
                    ) : (
                      <Button onClick={leaveReviewClick}>Leave Review</Button>
                    ))}
                </Actions>
              </Stack>
            </Box>
            <Box className={styles.description}>{blurb}</Box>
            {adventureReviews.length > 0 && (
              <Box>
                <Box shadow>
                  <Box component="h2" padding="none">
                    Reviews
                  </Box>
                  <Stack divider>
                    {adventureReviews.map(r => {
                      return (
                        <Box key={r.id}>
                          <Stack padding="small">
                            <strong>{r.headline}</strong>
                            <StarRating rating={r.rating} isEditable={false} />
                            {r.reviewBody}
                            <UserLink username={r.user.username} />
                          </Stack>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              </Box>
            )}
          </Stack>
          <Box className={styles.desktopCover}>
            <Box>
              <Columns>
                <img
                  className={styles.coverImage}
                  alt="story cover"
                  src={coverImage}
                />
                <Stack>
                  <Box component="h1" padding="none">
                    {title}
                  </Box>
                  <span>
                    <strong>{genre.name}</strong> by{' '}
                    {authors.length > 1 ? (
                      authors
                        .map(a => <UserLink username={a.username} />)
                        .join(', ')
                    ) : (
                      <UserLink username={authors[0].username} />
                    )}
                  </span>
                  <Actions>
                    {hasProgress && (
                      <Button onClick={onContinueClick}>Continue</Button>
                    )}
                    <Button
                      onClick={onStartAdventureClick}
                      disabled={!isAuthenticated(token)}
                    >
                      {isAuthenticated(token)
                        ? hasProgress
                          ? 'Start Over'
                          : 'Embark'
                        : 'Login to Embark'}
                    </Button>
                    {hasProgress &&
                      (reviews[id] ? (
                        <Button onClick={editReviewClick}>Edit Review</Button>
                      ) : (
                        <Button onClick={leaveReviewClick}>Leave Review</Button>
                      ))}
                  </Actions>
                </Stack>
              </Columns>
            </Box>
            <Box>
              <Box className={styles.description} shadow>
                {blurb}
              </Box>
            </Box>
            {adventureReviews.length > 0 && (
              <Box>
                <Box shadow>
                  <Box component="h2" padding="none">
                    Reviews
                  </Box>
                  <Stack divider>
                    {adventureReviews.map(r => {
                      return (
                        <Box key={r.id}>
                          <Stack padding="small">
                            <strong>{r.headline}</strong>
                            <StarRating rating={r.rating} isEditable={false} />
                            {r.reviewBody}
                            <UserLink username={r.user.username} />
                          </Stack>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              </Box>
            )}
          </Box>
        </Fragment>
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
      reviews: reviewsSelector(state),
    };
  }
  return props;
};

export default connect(mapStateToProps, {
  addToLibrary,
  addReview,
  updateReview,
  deleteReview,
})(Cover);
