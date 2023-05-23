import * as types from '../types';

const initialState = {
  sort: 'cheapest',
};

export const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SORT:
      return {
        ...state,
        filter: action.id,
      };
    default:
      return state;
  }
};
