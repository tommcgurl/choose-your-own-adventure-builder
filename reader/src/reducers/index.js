import { combineReducers } from 'redux-loop';
import adventure from './adventureReducer';
import adventures from './adventuresReducer';
import token from './authReducer';
import user from './userReducer';

const rootReducer = combineReducers({ user, adventures, adventure, token });

export default rootReducer;
