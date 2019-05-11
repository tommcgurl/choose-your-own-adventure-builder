import { AUTHENTICATED } from '../constants/actionTypes';
import apolloClient from '../services/apolloClient';

const setJwtMiddleware = store => next => action => {
  if (action.type === AUTHENTICATED) {
    apolloClient.setToken(action.token);
  }

  next(action);
};

export default setJwtMiddleware;
