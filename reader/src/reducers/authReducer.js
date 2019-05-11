import { AUTHENTICATED } from '../constants/actionTypes';
import initialState from '../store/initialState';

export default function authReducer(token = initialState.token, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return action.token;
    default:
      return token;
  }
}
