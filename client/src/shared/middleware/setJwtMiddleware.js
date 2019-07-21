import apolloClient from '../services/apolloClient';
import { types } from '../store/actions/authActions';

const setJwtMiddleware = store => next => action => {
  if (action.type === types.AUTHENTICATED) {
    apolloClient.setToken(action.token);
  } else if (action.type === types.LOG_OUT) {
    apolloClient.setToken(null);
  }

  next(action);
};

export default setJwtMiddleware;
