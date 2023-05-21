import React from 'react';

import './Filter.scss';

export const Filter = ({ id, name, checked, text, handleChecked }) => {
  return (
    <label className="filter__field">
      <input
        className="filter__input"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={() => handleChecked(id)}
      />
      <span className="filter__name">{text}</span>
    </label>
  );
};
