import { Cmd, loop } from 'redux-loop';
import {
  AUTHENTICATED,
  LOG_OUT,
} from '../../../shared/store/actions/authActions';
import reviewService from '../../services/readerReviewService';
import {
  ADD_REVIEW,
  DELETE_REVIEW,
  fetchAdventureReviewsSuccess,
  fetchUserReviewsSuccess,
  FETCH_ADVENTURE_REVIEWS,
  FETCH_ADVENTURE_REVIEWS_SUCCESS,
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
          [currentReview.id]: {
            id: currentReview.id,
            adventureId: currentReview.adventureId,
            rating: currentReview.rating,
            headline: currentReview.headline,
            reviewBody: currentReview.reviewBody,
          },
        };
      }, {});
    }
    case FETCH_ADVENTURE_REVIEWS: {
      const { adventureId } = action;
      return loop(
        reviews,
        Cmd.run(reviewService.fetchAdventureReviews, {
          successActionCreator: fetchAdventureReviewsSuccess,
          args: [adventureId],
        })
      );
    }
    case FETCH_ADVENTURE_REVIEWS_SUCCESS: {
      const { reviews } = action;
      return reviews.reduce((acc, currentReview) => {
        return {
          ...acc,
          [currentReview.id]: {
            id: currentReview.id,
            adventureId: currentReview.adventureId,
            user: currentReview.user,
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
          [review.id]: {
            id: review.id,
            adventureId,
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
      const { updatedReview } = action;
      return loop(
        {
          ...reviews,
          [updatedReview.id]: updatedReview,
        },
        Cmd.run(reviewService.updateReview, {
          args: [updatedReview],
        })
      );
    }
    case DELETE_REVIEW: {
      if (reviews[action.reviewId]) {
        let updatedReviews = { ...reviews };
        delete updatedReviews[action.reviewId];
        return loop(
          {
            ...updatedReviews,
          },
          Cmd.run(reviewService.deleteReview, {
            args: [action.reviewId],
          })
        );
      } else {
        return null;
      }
    }
    case LOG_OUT: {
      return {};
    }
    default:
      return reviews;
  }
}
