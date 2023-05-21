import React from 'react';

import Ticket from '../Ticket';

import './TicketList.scss';

export const TicketList = () => {
  return (
    <ul className="ticket-list">
      <li>
        <Ticket />
      </li>
      <li>
        <Ticket />
      </li>
      <li>
        <Ticket />
      </li>
      <li>
        <Ticket />
      </li>
      <li>
        <Ticket />
      </li>
    </ul>
  );
};
