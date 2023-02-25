export const putPlaceToStorage = (newPlace: string) => {
  const storage = JSON.parse(localStorage.getItem(`weatherWidget`) as any);
  storage.push(newPlace);
  localStorage.setItem(`weatherWidget`, JSON.stringify(storage));
};

export const removePlaceFromStorage = (name: string) => {
  const storage = JSON.parse(localStorage.getItem(`weatherWidget`) as any);
  const index = storage.findIndex(
    (nameOfPlace: string) => nameOfPlace === name
  );
  if (index > -1) {
    storage.splice(index, 1);
    localStorage.setItem(`weatherWidget`, JSON.stringify(storage));
  }
};
