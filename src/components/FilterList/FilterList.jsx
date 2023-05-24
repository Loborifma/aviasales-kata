import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from '../Filter';
import './FilterList.scss';
import { filter, filterAll } from '../../redux/actions';

export const FilterList = () => {
  const filters = useSelector((state) => {
    const { filtersReducer } = state;
    return filtersReducer.items;
  });
  const dispatch = useDispatch();

  const handleCheckedAll = () => {
    dispatch(filterAll());
  };

  const handleChecked = (id) => {
    dispatch(filter(id));
  };

  return (
    <aside className="filter">
      <span>Количество пересадок</span>
      <ul className="filter__list">
        {filters.map((event) => {
          if (event.id === 1) {
            return (
              <li className="filter__item" key={event.id}>
                <Filter {...event} handleChecked={handleCheckedAll} />
              </li>
            );
          } else {
            return (
              <li className="filter__item" key={event.id}>
                <Filter {...event} handleChecked={handleChecked} />
              </li>
            );
          }
        })}
      </ul>
    </aside>
  );
};
