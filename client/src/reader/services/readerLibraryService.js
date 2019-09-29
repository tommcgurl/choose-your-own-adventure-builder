import { gql } from 'apollo-boost';
import apolloClient from '../../shared/services/apolloClient';
import convertPlotsToHtml from '../helpers/convertPlotsToHtml';

const SAVE_TO_LIBRARY = gql`
  mutation saveToLibrary($id: String!, $progress: [BreadcrumbInput]!) {
    saveToLibrary(adventureId: $id, progress: $progress)
  }
`;

export default {
  addStoryToLibrary(id) {
    return apolloClient.mutate({
      mutation: SAVE_TO_LIBRARY,
      variables: { id },
    });
  },
  fetchLibrary() {
    const GET_LIBRARY = gql`
      {
        user {
          library {
            adventure {
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
              }
              coverImage
            }
            progress {
              storyPartKey
              position
              inventory
              stats
            }
          }
          reviews {
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
        query: GET_LIBRARY,
      })
      .then(response => {
        return response.data.user.library.map(libraryBook => ({
          ...libraryBook,
          adventure: convertPlotsToHtml(libraryBook.adventure),
        }));
      });
  },
  removeStoryFromLibrary(id) {
    const REMOVE_FROM_LIBRARY = gql`
      mutation removeFromLibrary($id: String!) {
        removeFromLibrary(adventureId: $id)
      }
    `;
    return apolloClient.mutate({
      mutation: REMOVE_FROM_LIBRARY,
      variables: { id },
    });
  },
  updateProgress(id, progress) {
    return apolloClient
      .mutate({
        mutation: SAVE_TO_LIBRARY,
        variables: { id, progress },
      })
      .then(res => Boolean(res.data.saveToLibrary));
  },
};
