import { API_URL } from '../constants';
import { FIND_USER } from '../constants/queries';
import apolloClient from './apolloClient';

export default {
  fetchUser(username) {
    return apolloClient
      .query({ query: FIND_USER, variables: { username } })
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
