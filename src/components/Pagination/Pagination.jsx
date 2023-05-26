import React from 'react';

import './Pagination.scss';

export const Pagination = ({ displayMoreTickets }) => {
  return (
    <button className="pagination" type="button" onClick={displayMoreTickets}>
      <span>Показать еще 5 билетов!</span>
    </button>
  );
};
