import ApolloClient from 'apollo-boost';
import { API_URL } from '../constants';

export default new ApolloClient({
  uri: `${API_URL}/graphql`,
});
