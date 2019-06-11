import { combineReducers } from 'redux-loop';
import draftsReducer from './draftsReducer';
import listReducer from './listReducer';
import publishedAdventuresReducer from './publishedAdventuresReducer';

const rootReducer = combineReducers({
  drafts: draftsReducer,
  publishedAdventures: publishedAdventuresReducer,
  lists: listReducer,
});

export default rootReducer;
