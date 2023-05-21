import React, { useState } from 'react';

import './Tabs.scss';

export const Tabs = () => {
  const options = [
    { value: 'Самый дешевый', key: 'chp' },
    { value: 'Самый быстрый', key: 'fst' },
    { value: 'Оптимальный', key: 'opt' },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].key);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <ul className="tabs">
      {options.map((e) => {
        const isChecked = selectedOption === e.key;
        return (
          <li className={`tabs__item ${isChecked && 'checked'}`} key={e.key}>
            <label className="tabs__field">
              <input type="radio" value={e.key} checked={isChecked} name="Tabs" onChange={handleChange} />
              <span>{e.value}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
};
