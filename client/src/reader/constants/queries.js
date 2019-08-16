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
          id
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
        id
        name
      }
      coverImage
    }
  }
`;

export const GET_LIBRARY = gql`
  {
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
          id
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
`;

export const GET_PROGRESS = gql`
  query progress($id: ID!) {
    progress(id: $id) {
      storyPartKey
      position
      inventory
      stats
    }
  }
`;
