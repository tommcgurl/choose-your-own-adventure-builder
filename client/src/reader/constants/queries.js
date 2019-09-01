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
          description
        }
        coverImage
      }
      pageInfo {
        endCursor
        hasNextPage
        searchString
        genres {
          name
          description
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
    }
  }
`;
