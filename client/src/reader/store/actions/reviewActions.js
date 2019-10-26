const actionTypeRoot = '[READER_REVIEWS]';

export const FETCH_USER_REVIEWS = `${actionTypeRoot} FETCH_USER_REVIEWS`;
export function fetchUserReviews() {
  return { type: FETCH_USER_REVIEWS };
}

export const FETCH_USER_REVIEWS_SUCCESS = `${actionTypeRoot} FETCH_USER_REVIEWS_SUCCESS`;
export function fetchUserReviewsSuccess(reviews) {
  return { type: FETCH_USER_REVIEWS_SUCCESS, reviews };
}

export const ADD_REVIEW = `${actionTypeRoot} ADD_REVIEW`;
export function addReview(adventureId, review) {
  return { type: ADD_REVIEW, adventureId, review };
}

export const UPDATE_REVIEW = `${actionTypeRoot} UPDATE_REVIEW`;
export function updateReview(adventureId, updatedReview) {
  return { type: UPDATE_REVIEW, adventureId, updatedReview };
}

export const DELETE_REVIEW = `${actionTypeRoot} DELETE_REVIEW`;
export function deleteReview(reviewId) {
  return { type: DELETE_REVIEW, reviewId };
}
