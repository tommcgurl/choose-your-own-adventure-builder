import { combineReducers } from 'redux-loop';
import libraryReducer from './libraryReducer';
import userSettingsReducer from './userSettingsReducer';

const rootReducer = combineReducers({
  library: libraryReducer,
  userSettings: userSettingsReducer,
});

export default rootReducer;
