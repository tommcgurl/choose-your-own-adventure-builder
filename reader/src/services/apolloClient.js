import ApolloClient from 'apollo-boost';
import { API_URL } from '../constants';

let authToken;

export default {
  get query() {
    const options = {
      uri: `${API_URL}/graphql`,
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
      },
    };
    return new ApolloClient({
      ...options,
    }).query;
  },
  setToken(token) {
    authToken = token;
  },
};
