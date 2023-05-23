import * as types from './types';

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
