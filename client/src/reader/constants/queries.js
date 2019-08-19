import { gql } from 'apollo-boost';

export const GET_ADVENTURES = gql`
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
          name
        }
        coverImage
      }
      pageInfo {
        endCursor
        hasNextPage
        searchString
        genres {
          name
        }
      }
    }
  }
`;

export const GET_ADVENTURE = gql`
  query adventure($id: ID!) {
    adventure(id: $id) {
      id
      authors {
        username
      }
      title
      intro
      items
      mainStory
      genre {
        name
      }
      coverImage
    }
  }
`;

export const GET_LIBRARY = gql`
  {
    user {
      library {
        adventure {
          id
          authors {
            username
          }
          title
          intro
          items
          mainStory
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
    }
  }
`;
