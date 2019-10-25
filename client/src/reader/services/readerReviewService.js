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
    const GET_USER_REVIEWS = gql`
      {
        user {
          reviews {
            adventureId
            id
            rating
            headline
            reviewBody
          }
        }
      }
    `;
    return apolloClient
      .query({
        query: GET_USER_REVIEWS,
      })
      .then(response => {
        return response.data.user.reviews;
      });
  },
  fetchAdventureReviews(adventureId) {
    const GET_ADVENTURE_REVIEWS = gql`
      query getAdventureReviews($adventureId: ID!) {
        adventure(id: $adventureId) {
          reviews {
            user {
              username
            }
            id
            rating
            headline
            reviewBody
          }
        }
      }
    `;
    return apolloClient
      .query({
        query: GET_ADVENTURE_REVIEWS,
        variables: { adventureId },
      })
      .then(response => response.data.adventure.reviews);
  },
  updateReview(updatedReview) {
    const UPDATE_REVIEW = gql`
      mutation updateReview($updatedReview: ReviewInput!) {
        updateReview(updatedReview: $updatedReview)
      }
    `;
    return apolloClient.mutate({
      mutation: UPDATE_REVIEW,
      variables: { updatedReview },
    });
  },
  deleteReview(reviewId) {
    const DELETE_REVIEW = gql`
      mutation deleteReview($reviewId: String!) {
        deleteReview(reviewId: $reviewId)
      }
    `;
    return apolloClient.mutate({
      mutation: DELETE_REVIEW,
      variables: { reviewId },
    });
  },
};
