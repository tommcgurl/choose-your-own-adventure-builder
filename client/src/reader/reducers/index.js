import { combineReducers } from 'redux-loop';
import adventureReducer from './adventureReducer';
import libraryReducer from './libraryReducer';

const rootReducer = combineReducers({
  library: libraryReducer,
  adventure: adventureReducer,
});

export default rootReducer;
