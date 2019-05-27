import { combineReducers } from 'redux-loop';
import currentDraftReducer from './currentDraftReducer';
import draftsReducer from './draftsReducer';
import editorReducer from './editorReducer';

const rootReducer = combineReducers({
  editor: editorReducer,
  drafts: draftsReducer,
  currentDraftId: currentDraftReducer,
});

export default rootReducer;
