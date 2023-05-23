import { combineReducers } from 'redux';

import { sortReducer } from './reducers/sortReducer';
import { filtersReducer } from './reducers/filtersReducer';

export const rootReducer = combineReducers({
  sortReducer,
  filtersReducer,
});
