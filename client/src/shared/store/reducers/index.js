import { combineReducers } from 'redux-loop';
import editorReducer from '../../../editor/store/reducers';
import readerReducer from '../../../reader/store/reducers';
import authReducer from './authReducer';
import listReducer from './listReducer';
import userSettingsReducer from './userSettingsReducer';

const rootReducer = combineReducers({
  reader: readerReducer,
  editor: editorReducer,
  token: authReducer,
  lists: listReducer,
  userSettings: userSettingsReducer,
});

export default rootReducer;
