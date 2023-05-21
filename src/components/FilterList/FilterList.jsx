import React, { useState } from 'react';

import Filter from '../Filter';

import './FilterList.scss';

export const FilterList = () => {
  const [filters, setFilters] = useState([
    { name: 'All', text: 'Все', id: 1, checked: false },
    { name: 'No transfer', text: 'Без пересадоксе', id: 2, checked: false },
    { name: '1 transfer', text: '1 пересадка', id: 3, checked: false },
    { name: '2 transfer', text: '2 пересадки', id: 4, checked: false },
    { name: '3 transfer', text: '3 пересадки', id: 5, checked: false },
  ]);

  const handleChecked = (id) => {
    setFilters((prevFilters) => {
      const indx = prevFilters.findIndex((e) => e.id === id);

      const oldItem = prevFilters[indx];
      const newItem = { ...oldItem, checked: !oldItem['checked'] };

      return [...prevFilters.slice(0, indx), newItem, ...prevFilters.slice(indx + 1)];
    });
  };

  return (
    <aside className="filter">
      <span>Количество пересадок</span>
      <ul className="filter__list">
        {filters.map((e) => {
          return (
            <li className="filter__item" key={e.id}>
              <Filter {...e} handleChecked={handleChecked} />
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
