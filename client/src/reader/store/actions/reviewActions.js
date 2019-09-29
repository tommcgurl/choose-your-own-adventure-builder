const actionTypeRoot = '[READER_REVIEWS]';

export const FETCH_REVIEWS = `${actionTypeRoot} FETCH_REVIEWS`;
export function fetchUserReviews() {
  return { type: FETCH_REVIEWS };
}

export const FETCH_REVIEWS_SUCCESS = `${actionTypeRoot} FETCH_REVIEWS_SUCCESS`;
export function getUserReviewsSuccess(reviews) {
  return { type: FETCH_REVIEWS_SUCCESS, reviews };
}

export const ADD_REVIEW = `${actionTypeRoot} ADD_REVIEW`;
export function addReview(adventureId, review) {
  return { type: ADD_REVIEW, adventureId, review };
}

export const UPDATE_REVIEW = `${actionTypeRoot} UPDATE_REVIEW`;
export function updateReview(reviewId, updatedReview) {
  return { type: UPDATE_REVIEW, reviewId, updatedReview };
}
