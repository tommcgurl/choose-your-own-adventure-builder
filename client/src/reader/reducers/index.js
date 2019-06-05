import { combineReducers } from 'redux-loop';
import adventureReducer from './adventureReducer';
import libraryReducer from './libraryReducer';
import userSettingsReducer from './userSettingsReducer';

const rootReducer = combineReducers({
  library: libraryReducer,
  adventure: adventureReducer,
  userSettings: userSettingsReducer,
});

export default rootReducer;
