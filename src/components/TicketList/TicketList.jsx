import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ticket from '../Ticket';
import Pagination from '../Pagination';
import './TicketList.scss';
import { initSearchId, loadTickets } from '../../redux/actions';
import { getAmountTickets, sortTickets, filterTickets } from '../../utils/utils.js';
import ProgressBar from '../ProgressBar';

export const TicketList = () => {
  const session = useSelector((state) => state.ticketListReducer);
  const sortMethod = useSelector((state) => state.sortReducer.sort);
  const filterOptions = useSelector((state) => state.filtersReducer.items);
  const dispatch = useDispatch();

  const [packedTickets, setPackedTicket] = useState([]);
  const [chunkedTickets, setChunkedTickets] = useState([]);
  const [chunkTicketGenerator, setChunkTicketGenerator] = useState(null);
  const [isFirstPack, setIsFirstPack] = useState(true);
  const [isEmptyTicketList, setIsEmptyTicketList] = useState(false);

  const _amountPerPack = 499;

  useEffect(() => {
    dispatch(initSearchId());
  }, []);

  useEffect(() => {
    if (!session.stop && session.searchId) {
      dispatch(loadTickets(session.searchId));
    }
    if (isFirstPack && session.tickets.length) {
      setIsFirstPack(false);
      const sortedPack = updatePackTickets(session.tickets, sortMethod);
      updateChunkTickets(sortedPack);
    }
  }, [session.searchId, session.tickets, session.error]);

  useEffect(() => {
    if (chunkedTickets.length >= packedTickets.length - 20 && packedTickets.length) {
      updatePackTickets(session.tickets, sortMethod, packedTickets.length);
    }
  }, [chunkedTickets]);

  useEffect(() => {
    if (packedTickets.length) {
      const filterOptionsOn = filterOptions
        .map((element) => (element.checked ? element : ''))
        .filter((el) => el !== '');
      const sortedPack = updatePackTickets(session.tickets, sortMethod, filterOptionsOn);
      updateChunkTickets(sortedPack);
    }
  }, [sortMethod, filterOptions]);

  const handleShowMoreTickets = () => {
    const chunk = chunkTicketGenerator.next().value;
    setChunkedTickets((prevArr) => [...prevArr, ...chunk]);
  };

  const updatePackTickets = (tickets, sortMethod, filters = [], offset = 0) => {
    const mathOffset = offset ? offset * 1.5 : _amountPerPack;
    const generator = getAmountTickets(tickets, mathOffset);
    const pack = generator.next().value;
    const filteredPack = filterTickets(pack, filters);

    if (!filteredPack.length) {
      setIsEmptyTicketList(true);
      return;
    }
    const sortedPack = sortTickets(filteredPack, sortMethod);
    setPackedTicket(sortedPack);
    return sortedPack;
  };

  const updateChunkTickets = (sortedTickets) => {
    const chunkGenerator = getAmountTickets(sortedTickets);
    setChunkTicketGenerator(chunkGenerator);
    setChunkedTickets(chunkGenerator.next().value);
  };

  return (
    <>
      <ProgressBar />
      <ul className="ticket-list">
        {isEmptyTicketList ? (
          <div className="ticket-list__empty">
            <span>Рейсов, подходящих под заданные фильтры, не найдено</span>
          </div>
        ) : (
          chunkedTickets.map((element) => {
            return (
              <li key={element.id}>
                <Ticket {...element} />
              </li>
            );
          })
        )}
      </ul>
      {!isEmptyTicketList && <Pagination handleShowMoreTickets={handleShowMoreTickets} />}
    </>
  );
};
