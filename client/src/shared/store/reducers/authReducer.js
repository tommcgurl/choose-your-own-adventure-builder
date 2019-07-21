import { types } from '../actions/authActions';
import initialState from '../initialState';

export default function authReducer(token = initialState.token, action) {
  switch (action.type) {
    case types.AUTHENTICATED:
      return action.token;
    case types.LOG_OUT:
      return null;
    default:
      return token;
  }
}
