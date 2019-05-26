import ApolloClient from 'apollo-boost';
import { API_URL } from '../constants';

let authToken;

function getApolloClient() {
  const options = {
    uri: `${API_URL}/graphql`,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
  return new ApolloClient({
    ...options,
  });
}

export default {
  get query() {
    return getApolloClient().query;
  },
  get mutate() {
    return getApolloClient().mutate;
  },
  setToken(token) {
    authToken = token;
  },
};
