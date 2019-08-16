import { combineReducers } from 'redux-loop';
import draftsReducer from './draftsReducer';
import publishedAdventuresReducer from './publishedAdventuresReducer';

const rootReducer = combineReducers({
  drafts: draftsReducer,
  publishedAdventures: publishedAdventuresReducer,
});

export default rootReducer;
