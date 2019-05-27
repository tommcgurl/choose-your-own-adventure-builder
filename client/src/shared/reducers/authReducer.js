import initialState from '../../editor/store/initialState';
import { AUTHENTICATED, LOG_OUT } from '../constants/actionTypes';

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
