import React, { useEffect } from 'react';

import Wrapper from '../Wrapper';
import FilterList from '../FilterList';
import Tabs from '../Tabs';
import TicketList from '../TicketList';
import Pagination from '../Pagination';
import logo from '../../assets/icons/Logo.png';

import './App.scss';

export const App = () => {
  return (
    <Wrapper>
      <header>
        <img src={logo} alt="Logo" />
      </header>
      <main className="app">
        <FilterList />
        <div className="app__tickets">
          <Tabs />
          <TicketList />
          <Pagination />
        </div>
      </main>
    </Wrapper>
  );
};
