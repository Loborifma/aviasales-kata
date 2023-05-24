import * as types from './types';

const _baseUrl = 'https://aviasales-test-api.kata.academy';

export function sort(id) {
  return {
    type: types.SORT,
    id,
  };
}

export function filter(id) {
  return {
    type: types.FILTER,
    id,
  };
}

export function filterAll() {
  return {
    type: types.FILTER_ALL,
  };
}

export function initSearchId() {
  return async (dispatch) => {
    try {
      const response = await fetch(_baseUrl + '/search');
      const jsonData = await response.json();
      dispatch({
        type: types.INIT_SEARCH_ID,
        data: jsonData,
      });
    } catch (error) {
      throw new Error('Ошибка при инициализации поиска: ' + error.message);
    }
  };
}

export function loadTickets(searchId) {
  return async (dispatch) => {
    try {
      const response = await fetch(_baseUrl + `/tickets?searchId=${searchId}`);
      const jsonData = await response.json();
      dispatch({
        type: types.LOAD_TICKETS,
        data: jsonData,
      });
    } catch (error) {
      initSearchId();
    }
  };
}
