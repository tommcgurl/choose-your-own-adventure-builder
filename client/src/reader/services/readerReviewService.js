import { gql } from 'apollo-boost';
import apolloClient from '../../shared/services/apolloClient';

export default {
  addReviewToStory(adventureId, review) {
    const ADD_REVIEW = gql`
      mutation addReview($adventureId: String!, $review: ReviewInput!) {
        addReview(adventureId: $adventureId, review: $review)
      }
    `;
    return apolloClient.mutate({
      mutation: ADD_REVIEW,
      variables: { adventureId, review },
    });
  },
  fetchUserReviews() {
    const GET_REVIEWS = gql`
      {
        user {
          reviews {
            id
            adventureId
            rating
            headline
            reviewBody
          }
        }
      }
    `;
    return apolloClient
      .query({
        query: GET_REVIEWS,
      })
      .then(response => {
        return response.data.user.reviews;
      });
  },
  updateReview(reviewId, updatedReview) {
    const UPDATE_REVIEW = gql`
      mutation updateReview($reviewId: String!, $updatedReview: ReviewInput!) {
        updateReview(reviewId: $reviewId, updatedReview: $updatedReview)
      }
    `;
    return apolloClient.mutate({
      mutation: UPDATE_REVIEW,
      variables: { reviewId, updatedReview },
    });
  },
};
