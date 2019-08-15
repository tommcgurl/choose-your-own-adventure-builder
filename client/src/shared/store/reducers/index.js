import { combineReducers } from 'redux-loop';
import editorReducer from '../../../editor/store/reducers';
import readerReducer from '../../../reader/store/reducers';
import authReducer from './authReducer';
import listReducer from './listReducer';

const rootReducer = combineReducers({
  reader: readerReducer,
  editor: editorReducer,
  token: authReducer,
  lists: listReducer,
});

export default rootReducer;
