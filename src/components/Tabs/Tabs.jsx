import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Tabs.scss';
import { sort } from '../../store/actions';

export const Tabs = () => {
  const options = [
    { value: 'Самый дешевый', key: 'cheapest' },
    { value: 'Самый быстрый', key: 'fastest' },
    { value: 'Оптимальный', key: 'optimal' },
  ];

  const selectedOption = useSelector((state) => {
    const { sortReducer } = state;
    return sortReducer.sort;
  });
  const dispatch = useDispatch();

  const handleChangeSortMethod = (event) => {
    dispatch(sort(event.target.value));
  };

  return (
    <ul className="tabs">
      {options.map((e) => {
        const isChecked = selectedOption === e.key;
        return (
          <li className={`tabs__item ${isChecked && 'checked'}`} key={e.key}>
            <label className="tabs__field">
              <input type="radio" value={e.key} checked={isChecked} name="Tabs" onChange={handleChangeSortMethod} />
              <span>{e.value}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
};
