import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(user = initialState.user, action) {
  switch (action.type) {
    case types.ADD_TO_READ_LIST:
      return { ...user, storiesRead: [...user.storiesRead, action.id] };
    default:
      return user;
  }
}
