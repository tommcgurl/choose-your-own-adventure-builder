import { combineReducers } from 'redux-loop';

import pageReducer from './pageReducer';
import editorReducer from './editorReducer';

const rootReducer = combineReducers({
  page: pageReducer,
  editorState: editorReducer,
});

export default rootReducer;
