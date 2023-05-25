import { v4 as uuidv4 } from 'uuid';

import * as types from '../types';

const initialState = {
  tickets: [],
  stop: false,
  searchId: '',
  error: false,
};

export const ticketListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_SEARCH_ID: {
      const searchId = action.data['searchId'];
      return {
        ...state,
        searchId,
      };
    }
    case types.LOAD_TICKETS: {
      const tickets = action.data['tickets'].map((element) => {
        element.id = uuidv4();
        return element;
      });
      const newTickets = [...state.tickets, ...tickets];
      const stop = action.data['stop'];
      const error = action.error;

      return {
        ...state,
        tickets: newTickets,
        stop,
        error,
      };
    }
    default:
      return state;
  }
};
