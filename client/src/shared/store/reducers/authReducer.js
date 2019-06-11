import { AUTHENTICATED, LOG_OUT } from '../../constants/actionTypes';
import initialState from '../initialState';

export default function authReducer(token = initialState.token, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return action.token;
    case LOG_OUT:
      return null;
    default:
      return token;
  }
}
