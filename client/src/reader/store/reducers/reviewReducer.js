import { Cmd, loop } from 'redux-loop';
import {
  AUTHENTICATED,
  LOG_OUT,
} from '../../../shared/store/actions/authActions';
import reviewService from '../../services/readerReviewService';
import {
  ADD_REVIEW,
  DELETE_REVIEW,
  fetchUserReviewsSuccess,
  FETCH_USER_REVIEWS,
  FETCH_USER_REVIEWS_SUCCESS,
  UPDATE_REVIEW,
} from '../actions/reviewActions';
import initialState from '../initialState';

export default function reviewReducer(reviews = initialState.reviews, action) {
  switch (action.type) {
    case AUTHENTICATED:
    case FETCH_USER_REVIEWS: {
      return loop(
        reviews,
        Cmd.run(reviewService.fetchUserReviews, {
          successActionCreator: fetchUserReviewsSuccess,
        })
      );
    }
    case FETCH_USER_REVIEWS_SUCCESS: {
      return action.reviews.reduce((acc, currentReview) => {
        return {
          ...acc,
          [currentReview.adventureId]: {
            id: currentReview.id,
            rating: currentReview.rating,
            headline: currentReview.headline,
            reviewBody: currentReview.reviewBody,
          },
        };
      }, {});
    }
    case ADD_REVIEW: {
      const { adventureId, review } = action;
      return loop(
        {
          ...reviews,
          [adventureId]: {
            id: review.id,
            headline: review.headline,
            rating: review.rating,
            reviewBody: review.reviewBody,
          },
        },
        Cmd.run(reviewService.addReviewToStory, {
          args: [adventureId, review],
        })
      );
    }
    case UPDATE_REVIEW: {
      const { adventureId, updatedReview } = action;
      return loop(
        {
          ...reviews,
          [adventureId]: updatedReview,
        },
        Cmd.run(reviewService.updateReview, {
          args: [updatedReview],
        })
      );
    }
    case DELETE_REVIEW: {
      const { reviewId } = action;
      const adventureId = Object.keys(reviews).find(
        k => reviews[k].id === reviewId
      );
      if (reviews[adventureId]) {
        let updatedReviews = { ...reviews };
        delete updatedReviews[adventureId];
        return loop(
          {
            ...updatedReviews,
          },
          Cmd.run(reviewService.deleteReview, {
            args: [reviewId],
          })
        );
      } else {
        return reviews;
      }
    }
    case LOG_OUT: {
      return {};
    }
    default:
      return reviews;
  }
}
