import { gql } from 'apollo-boost';
import apolloClient from '../../shared/services/apolloClient';

export default {
  fetchAdventureReviews(adventureId) {
    const GET_ADVENTURE_REVIEWS = gql`
      query getAdventureReviews($id: ID!) {
        adventure(id: $id) {
          reviews {
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
        variables: { id: adventureId },
      })
      .then(response => {
        return response.data.adventure.reviews;
      });
  },
};
