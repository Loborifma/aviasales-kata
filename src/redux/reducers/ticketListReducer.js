import { v4 as uuidv4 } from 'uuid';

import * as types from '../types';

const initialState = {
  tickets: [],
  stop: false,
  searchId: '',
  error: false,
  countPack: 0,
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
        return { ...element, id: uuidv4() };
      });
      const newTickets = [...state.tickets, ...tickets];
      const stop = action.data['stop'];
      const error = action.data['error'];

      let progress;

      if (!error && !state.stop) {
        progress = JSON.parse(JSON.stringify(state.countPack)) + 1;
      } else {
        progress = state.countPack;
      }

      return {
        ...state,
        tickets: newTickets,
        stop,
        error,
        countPack: progress,
      };
    }
    default:
      return state;
  }
};
