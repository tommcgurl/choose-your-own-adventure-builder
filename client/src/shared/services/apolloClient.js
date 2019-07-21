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

const apolloClient = {
  query: options => {
    return getApolloClient()
      .query(options)
      .then(res => JSON.parse(JSON.stringify(res), omitTypename));
  },
  mutate: options => {
    return getApolloClient()
      .mutate(options)
      .then(res => JSON.parse(JSON.stringify(res), omitTypename));
  },
  setToken: token => {
    authToken = token;
  },
};

const omitTypename = (key, value) => (key === '__typename' ? undefined : value);

export default apolloClient;
