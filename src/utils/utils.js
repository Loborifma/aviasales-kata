export const updateToggleValue = (arr, id, propertyName) => {
  const prevItems = arr;
  const indx = prevItems.findIndex((element) => element.id === id);

  const oldItem = prevItems[indx];
  const newItem = { ...oldItem, checked: !oldItem[propertyName] };

  return [...prevItems.slice(0, indx), newItem, ...prevItems.slice(indx + 1)];
};
