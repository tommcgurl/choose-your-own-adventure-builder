import { combineReducers } from 'redux-loop';
import libraryReducer from './libraryReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
  library: libraryReducer,
  reviews: reviewReducer,
});

export default rootReducer;
