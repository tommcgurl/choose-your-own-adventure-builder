import { combineReducers } from 'redux-loop';
import draftsReducer from './draftsReducer';
import listReducer from './listReducer';

const rootReducer = combineReducers({
  drafts: draftsReducer,
  lists: listReducer,
});

export default rootReducer;
