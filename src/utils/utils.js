export const updateToggleValue = (arr, id, propertyName) => {
  const prevItems = arr;
  const indx = prevItems.findIndex((element) => element.id === id);

  const oldItem = prevItems[indx];
  const newItem = { ...oldItem, checked: !oldItem[propertyName] };

  return [...prevItems.slice(0, indx), newItem, ...prevItems.slice(indx + 1)];
};

export const sortTickets = (tickets, selectedOption) => {
  let newArr;
  switch (selectedOption) {
    case 'fastest': {
      newArr = tickets.sort((el1, el2) => {
        const durationPrev = el1.segments[0].duration + el1.segments[1].duration;
        const durationNext = el2.segments[0].duration + el2.segments[1].duration;
        return durationPrev - durationNext;
      });
      break;
    }
    case 'optimal': {
      newArr = tickets.sort((el1, el2) => {
        const durationPrev = el1.segments[0].duration + el1.segments[1].duration;
        const durationNext = el2.segments[0].duration + el2.segments[1].duration;
        const optValuePrev = el1.price / 10 + durationPrev;
        const optValueNext = el2.price / 10 + durationNext;
        return optValuePrev - optValueNext;
      });
      break;
    }
    default: {
      newArr = tickets.sort((el1, el2) => el1.price - el2.price);
    }
  }
  return [...newArr];
};

export const filterTickets = (tickets, filters) => {
  const copyArr = JSON.parse(JSON.stringify(tickets));
  let newArr = [];
  if (!filters.length) return copyArr;
  if (Array.isArray(filters)) {
    filters
      .sort((a, b) => b.id - a.id)
      .map((el) => {
        switch (el.name) {
          case 'No transfer': {
            const filteredArr = copyArr.filter((el) => {
              return !el.segments[0].stops.length || !el.segments[1].stops.length;
            });
            return newArr.push(...filteredArr);
          }
          case '1 transfer': {
            const filteredArr = copyArr.filter((el) => {
              return el.segments[0].stops.length === 1 || el.segments[1].stops.length === 1;
            });
            return newArr.push(...filteredArr);
          }
          case '2 transfer': {
            const filteredArr = copyArr.filter((el) => {
              return el.segments[0].stops.length === 2 || el.segments[1].stops.length === 2;
            });
            return newArr.push(...filteredArr);
          }
          case '3 transfer': {
            const filteredArr = copyArr.filter((el) => {
              return el.segments[0].stops.length === 3 || el.segments[1].stops.length === 3;
            });
            return newArr.push(...filteredArr);
          }
          default: {
            return newArr.push(...copyArr);
          }
        }
      });
  }
  const tmpArr = new Set(newArr);
  return [...tmpArr];
};

export function* getAmountTickets(tickets, amount = 5) {
  let index = 0;
  while (index < tickets.length) {
    const chunk = tickets.slice(index, index + amount);
    index += amount;
    yield chunk;
  }
}
