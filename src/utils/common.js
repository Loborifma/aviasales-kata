export const updateToggleValue = (array, id, propertyName) => {
  const prevArray = array;
  const currentItem = prevArray.findIndex((element) => element.id === id);

  const oldItem = prevArray[currentItem];
  const newItem = { ...oldItem, checked: !oldItem[propertyName] };

  return [...prevArray.slice(0, currentItem), newItem, ...prevArray.slice(currentItem + 1)];
};
