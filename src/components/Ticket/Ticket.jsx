import React from 'react';

import './Ticket.scss';

const formatPrice = (price) => {
  const stringPrice = `${price}`;
  const firstHalf = stringPrice.slice(0, -3);
  const secondHalf = stringPrice.slice(-3);

  return [...firstHalf, ' ', ...secondHalf].join('');
};

const formatTime = (date, duration) => {
  const startDate = new Date(date);
  const endDate = new Date(startDate.getTime() + duration * 60000);

  const getHoursAndMinutes = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const startTime = getHoursAndMinutes(startDate);
  const endTime = getHoursAndMinutes(endDate);
  return `${startTime} - ${endTime}`;
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (duration % 60).toString().padStart(2, '0');
  return `${hours}ч ${minutes}м`;
};

const handleStops = (stops) => {
  const len = stops.length;

  let transfer;

  switch (len) {
    case len > 1: {
      transfer = 'пересадки';
      break;
    }
    case len === 1: {
      transfer = 'пересадка';
      break;
    }
    default:
      transfer = 'пересадок';
  }

  return len ? `${len} ${transfer}` : `Без ${transfer}`;
};

export const Ticket = ({ price, carrier, segments: [to, from] }) => {
  return (
    <div className="ticket">
      <span>{formatPrice(price)} P</span>
      <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="Aviacompany logo" />
      <ul className="ticket__description">
        <li>
          <span>
            {to.origin} - {to.destination}
          </span>
          <br />
          <span>{formatTime(to.date, to.duration)}</span>
        </li>
        <li>
          <span>В пути</span>
          <br />
          <span>{formatDuration(to.duration)}</span>
        </li>
        <li>
          <span>{handleStops(to.stops)}</span>
          <br />
          <span>{to.stops.join(', ')}</span>
        </li>
        <li>
          <span>
            {from.origin} - {from.destination}
          </span>
          <br />
          <span>{formatTime(from.date, from.duration)}</span>
        </li>
        <li>
          <span>В пути</span>
          <br />
          <span>{formatDuration(from.duration)}</span>
        </li>
        <li>
          <span>{handleStops(from.stops)}</span>
          <br />
          <span>{from.stops.join(', ')}</span>
        </li>
      </ul>
    </div>
  );
};
