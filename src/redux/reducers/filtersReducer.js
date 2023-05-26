import { updateToggleValue } from '../../utils/utils';
import * as types from '../types';

const initialState = {
  items: [
    { name: 'All', text: 'Все', id: 1, checked: false },
    { name: 'No transfer', text: 'Без пересадоксе', id: 2, checked: false },
    { name: '1 transfer', text: '1 пересадка', id: 3, checked: false },
    { name: '2 transfer', text: '2 пересадки', id: 4, checked: false },
    { name: '3 transfer', text: '3 пересадки', id: 5, checked: false },
  ],
};

export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER: {
      const items = state.items;

      let newArray = updateToggleValue(items, action.id, 'checked');
      const isAllChecked = newArray.filter((element) => element.id !== 1).every((element) => element.checked);

      if (isAllChecked) {
        newArray[0] = { ...newArray[0], checked: true };
      } else {
        newArray[0] = { ...newArray[0], checked: false };
      }

      return {
        ...state,
        items: newArray,
      };
    }
    case types.FILTER_ALL: {
      const newArray = state.items.map((element) => {
        const isChecked = !state.items[0]['checked'];
        return {
          ...element,
          checked: isChecked,
        };
      });

      return {
        ...state,
        items: newArray,
      };
    }
    default:
      return state;
  }
};
