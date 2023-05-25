import React from 'react';

import './Pagination.scss';

export const Pagination = ({ handleShowMoreTickets }) => {
  return (
    <button className="pagination" type="button" onClick={handleShowMoreTickets}>
      <span>Показать еще 5 билетов!</span>
    </button>
  );
};
