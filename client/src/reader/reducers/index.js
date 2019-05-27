import { combineReducers } from 'redux-loop';
import adventureReducer from './adventureReducer';
import adventuresReducer from './adventuresReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  adventures: adventuresReducer,
  adventure: adventureReducer,
});

export default rootReducer;
