import React from 'react';

import aviaLogo from '../../icons/S7 Logo.png';

import './Ticket.scss';

export const Ticket = () => {
  return (
    <div className="ticket">
      <span>13 400 P</span>
      <img src={aviaLogo} alt="Aviacompany logo" />
      <ul className="ticket__description">
        <li>
          <span>Mow - Hkt</span>
          <br />
          <span>10:45 - 08:00</span>
        </li>
        <li>
          <span>В пути</span>
          <br />
          <span>21ч 15м</span>
        </li>
        <li>
          <span>2 пересадки</span>
          <br />
          <span>Hkg, Jnb</span>
        </li>
        <li>
          <span>Mow - Hkt</span>
          <br />
          <span>11:20 - 00:50</span>
        </li>
        <li>
          <span>В пути</span>
          <br />
          <span>12ч 30м</span>
        </li>
        <li>
          <span>1 пересадки</span>
          <br />
          <span>Hkg</span>
        </li>
      </ul>
    </div>
  );
};
