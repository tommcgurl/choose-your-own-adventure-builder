import { combineReducers } from 'redux-loop';

import pageReducer from './pageReducer';
import editorReducer from './editorReducer';
import draftsReducer from './draftsReducer';
import currentDraftReducer from './currentDraftReducer';

const rootReducer = combineReducers({
  page: pageReducer,
  editorState: editorReducer,
  drafts: draftsReducer,
  currentDraftId: currentDraftReducer,
});

export default rootReducer;
