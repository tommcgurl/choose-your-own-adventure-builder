import { combineReducers } from 'redux-loop';
import editorReducer from '../../editor/reducers';
import readerReducer from '../../reader/reducers';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  reader: readerReducer,
  editor: editorReducer,
  token: authReducer,
});

export default rootReducer;
