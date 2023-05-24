import { v4 as uuidv4 } from 'uuid';

import * as types from '../types';

const initialState = {
  tickets: [],
  searchId: '',
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
      return {
        ...state,
        tickets,
      };
    }
    default:
      return state;
  }
};
