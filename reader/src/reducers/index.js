import { combineReducers } from 'redux-loop';
import adventure from './adventureReducer';
import adventures from './adventuresReducer';
import user from './userReducer';

const rootReducer = combineReducers({ user, adventures, adventure });

export default rootReducer;
