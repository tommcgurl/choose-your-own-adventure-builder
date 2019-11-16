import { gql } from 'apollo-boost';
import apolloClient from '../../shared/services/apolloClient';
import convertPlotsToHtml from '../helpers/convertPlotsToHtml';

export default {
  getAdventure(id) {
    const GET_ADVENTURE = gql`
      query adventure($id: ID!) {
        adventure(id: $id) {
          id
          authors {
            username
          }
          title
          blurb
          items
          firstPartId
          storyParts
          genre {
            name
            description
          }
          coverImage
        }
      }
    `;
    return apolloClient
      .query({ query: GET_ADVENTURE, variables: { id } })
      .then(response => {
        return (
          response.data &&
          response.data.adventure &&
          convertPlotsToHtml(response.data.adventure)
        );
      });
  },
  getAdventures({ size, from, searchString, genres, sort }) {
    const GET_ADVENTURES = gql`
      query paginatedAdventures($search: AdventureSearchInput!) {
        paginatedAdventures(search: $search) {
          adventures {
            id
            title
            authors {
              username
            }
            published
            genre {
              id
              name
            }
            coverImage
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `;
    return apolloClient
      .query({
        query: GET_ADVENTURES,
        variables: { search: { size, from, searchString, genres, sort } },
      })
      .then(response => response.data.paginatedAdventures);
  },
};
