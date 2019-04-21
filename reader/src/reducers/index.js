import { combineReducers } from 'redux-loop';

import user from './userReducer';
import stories from './storiesReducer';
import story from './storyReducer';
import page from './pageReducer';

const rootReducer = combineReducers({ user, stories, story, page: page });

export default rootReducer;
