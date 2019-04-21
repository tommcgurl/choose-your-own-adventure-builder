import { combineReducers } from 'redux-loop';

import pageReducer from './pageReducer';

const rootReducer = combineReducers({ page: pageReducer });

export default rootReducer;
