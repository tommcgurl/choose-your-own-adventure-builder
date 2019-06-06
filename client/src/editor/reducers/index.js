import { combineReducers } from 'redux-loop';
import draftsReducer from './draftsReducer';

const rootReducer = combineReducers({
  drafts: draftsReducer,
});

export default rootReducer;
