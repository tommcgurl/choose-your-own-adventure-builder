import { combineReducers } from 'redux-loop';
import libraryReducer from './libraryReducer';

const rootReducer = combineReducers({
  library: libraryReducer,
});

export default rootReducer;
