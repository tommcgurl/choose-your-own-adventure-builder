import { FIND_USER } from '../constants/queries';
import apolloClient from './apolloClient';
import { CREATE_USER } from '../constants/mutations';

export default {
  fetchUser(username) {
    return apolloClient
      .query({ query: FIND_USER, variables: { username } })
      .then(response => {
        return response.data.user;
      });
  },
  createUser(username, providerToken) {
    return apolloClient
      .mutate({
        mutation: CREATE_USER,
        variables: { userInput: { username, providerToken } },
      })
      .then(response => {
        return response.data.createUser;
      });
  },
};
