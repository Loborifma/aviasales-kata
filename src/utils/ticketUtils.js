export const sortTickets = (tickets, selectedOption) => {
  let newArray;
  switch (selectedOption) {
    case 'fastest': {
      newArray = tickets.sort((prevElement, nextElement) => {
        const durationPrev = prevElement.segments[0].duration + prevElement.segments[1].duration;
        const durationNext = nextElement.segments[0].duration + nextElement.segments[1].duration;
        return durationPrev - durationNext;
      });
      break;
    }
    case 'optimal': {
      newArray = tickets.sort((prevElement, nextElement) => {
        const durationPrev = prevElement.segments[0].duration + prevElement.segments[1].duration;
        const durationNext = nextElement.segments[0].duration + nextElement.segments[1].duration;
        const optValuePrev = prevElement.price / 10 + durationPrev;
        const optValueNext = nextElement.price / 10 + durationNext;
        return optValuePrev - optValueNext;
      });
      break;
    }
    default: {
      newArray = tickets.sort((prevElement, nextElement) => prevElement.price - nextElement.price);
    }
  }
  return [...newArray];
};

export const filterTickets = (tickets, filters) => {
  let newArray = [];
  if (!filters.length) return tickets;
  if (Array.isArray(filters)) {
    filters
      .sort((a, b) => b.id - a.id)
      .map((el) => {
        switch (el.name) {
          case 'No transfer': {
            const filteredArray = tickets.filter((el) => {
              return !el.segments[0].stops.length || !el.segments[1].stops.length;
            });
            return newArray.push(...filteredArray);
          }
          case '1 transfer': {
            const filteredArray = tickets.filter((el) => {
              return el.segments[0].stops.length === 1 || el.segments[1].stops.length === 1;
            });
            return newArray.push(...filteredArray);
          }
          case '2 transfer': {
            const filteredArray = tickets.filter((el) => {
              return el.segments[0].stops.length === 2 || el.segments[1].stops.length === 2;
            });
            return newArray.push(...filteredArray);
          }
          case '3 transfer': {
            const filteredArray = tickets.filter((el) => {
              return el.segments[0].stops.length === 3 || el.segments[1].stops.length === 3;
            });
            return newArray.push(...filteredArray);
          }
          default: {
            return newArray.push(...tickets);
          }
        }
      });
  }
  const arrayWithoutCopyItems = new Set(newArray);
  return [...arrayWithoutCopyItems];
};

export function* getAmountTickets(tickets, amount = 50, offset = 0) {
  let index = offset;
  while (index < tickets.length) {
    const chunk = tickets.slice(index, index + amount);
    index += amount;
    yield chunk;
  }
}
