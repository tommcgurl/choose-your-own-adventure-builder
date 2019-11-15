import { gql } from 'apollo-boost';
import { API_URL } from '../constants';
import apolloClient from './apolloClient';

export default {
  fetchUser(username) {
    const FIND_USER = gql`
      query user($username: String!) {
        user(username: $username) {
          id
          username
        }
      }
    `;
    return apolloClient
      .query({ query: FIND_USER, variables: { username } })
      .then(response => {
        return response.data.user;
      });
  },
  getUserProfile(username) {
    const GET_USER_PROFILE = gql`
      query user($username: String!) {
        user(username: $username) {
          id
          username
          bio
          photo
          bibliography {
            id
            title
          }
          library {
            adventure {
              id
              title
            }
          }
        }
      }
    `;
    return apolloClient
      .query({ query: GET_USER_PROFILE, variables: { username } })
      .then(response => {
        return response.data.user;
      });
  },
  createUser(username, providerToken) {
    return fetch(`${API_URL}/auth/create_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${providerToken}`,
      },
      body: JSON.stringify({ username }),
    }).then(res => res.text());
  },
};
