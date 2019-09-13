import apolloClient from '../services/apolloClient';
import { AUTHENTICATED, LOG_OUT } from '../store/actions/authActions';

const setJwtMiddleware = store => next => action => {
  if (action.type === AUTHENTICATED) {
    apolloClient.setToken(action.token);
  } else if (action.type === LOG_OUT) {
    apolloClient.setToken(null);
  }

  next(action);
};

export default setJwtMiddleware;
