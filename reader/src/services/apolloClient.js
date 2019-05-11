import ApolloClient from 'apollo-boost';

let authToken;

export default {
  get query() {
    const options = {
      uri: 'http://localhost:3002/graphql',
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
