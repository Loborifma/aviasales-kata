import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ticket from '../Ticket';
import Pagination from '../Pagination';
import './TicketList.scss';
import { initSearchId, loadTickets } from '../../redux/actions';

function* getFiveTickets(tickets) {
  let index = 0;
  while (index < tickets.length) {
    const chunk = tickets.slice(index, index + 5);
    index += 5;
    yield chunk;
  }
}

export const TicketList = () => {
  const session = useSelector((state) => {
    const { ticketListReducer } = state;
    return {
      tickets: ticketListReducer.tickets,
      stop: ticketListReducer.stop,
      searchId: ticketListReducer.searchId,
      error: ticketListReducer.error,
    };
  });
  const dispatch = useDispatch();

  const [isFirstPackTickets, setIsFirstPackTickets] = useState(true);
  const [chunkedTickets, setChunkedTickets] = useState([]);
  const [ticketGenerator, setTicketGenerator] = useState(null);

  useEffect(() => {
    dispatch(initSearchId());
  }, []);

  useEffect(() => {
    if (!session.stop) {
      dispatch(loadTickets(session.searchId));
    }
    if (isFirstPackTickets && session.tickets.length) {
      setIsFirstPackTickets(false);
      const generator = getFiveTickets(session.tickets);
      setTicketGenerator(generator);
    }
  }, [session.searchId, session.tickets, session.error]);

  useEffect(() => {
    if (ticketGenerator) {
      const chunk = ticketGenerator.next().value;
      setChunkedTickets(chunk);
    }
  }, [ticketGenerator]);

  const handleShowMoreTickets = () => {
    const chunk = ticketGenerator.next().value;
    setChunkedTickets((prevArr) => [...prevArr, ...chunk]);
  };

  return (
    <>
      <ul className="ticket-list">
        {chunkedTickets.map((element) => {
          return (
            <li key={element.id}>
              <Ticket {...element} />
            </li>
          );
        })}
      </ul>
      <Pagination handleShowMoreTickets={handleShowMoreTickets} />
    </>
  );
};
