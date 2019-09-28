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
};
