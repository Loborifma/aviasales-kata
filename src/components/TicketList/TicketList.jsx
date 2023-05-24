import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ticket from '../Ticket';
import './TicketList.scss';
import { initSearchId, loadTickets } from '../../redux/actions';

export const TicketList = () => {
  const session = useSelector((state) => {
    const { ticketListReducer } = state;
    return { tickets: ticketListReducer.tickets, searchId: ticketListReducer.searchId };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSearchId());
  }, []);

  useEffect(() => {
    dispatch(loadTickets(session.searchId));
  }, [session.searchId]);

  return (
    <ul className="ticket-list">
      {session.tickets.map((element) => {
        return (
          <li key={element.id}>
            <Ticket {...element} />
          </li>
        );
      })}
    </ul>
  );
};
