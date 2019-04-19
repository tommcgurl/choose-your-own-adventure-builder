import { combineReducers } from 'redux-loop';

import user from './userReducer';
import stories from './storyReducer';

const rootReducer = combineReducers({ user, stories });

export default rootReducer;
