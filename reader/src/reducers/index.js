import { combineReducers } from 'redux-loop';

import user from './userReducer';
import stories from './storiesReducer';
import story from './storyReducer';

const rootReducer = combineReducers({ user, stories, story });

export default rootReducer;
