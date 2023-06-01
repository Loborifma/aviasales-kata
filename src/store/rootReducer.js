import { combineReducers } from 'redux';

import { sortReducer } from './reducers/sortReducer';
import { filtersReducer } from './reducers/filtersReducer';
import { ticketListReducer } from './reducers/ticketListReducer';

export const rootReducer = combineReducers({
  sortReducer,
  filtersReducer,
  ticketListReducer,
});
