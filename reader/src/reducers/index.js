import { combineReducers } from 'redux-loop';

import user from './userReducer';
import adventures from './adventuresReducer';
import adventure from './adventureReducer';
import page from './pageReducer';

const rootReducer = combineReducers({ user, adventures, adventure, page });

export default rootReducer;
