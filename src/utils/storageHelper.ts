export const putPlaceToStorage = (newPlace: string) => {
  const storage = JSON.parse(localStorage.getItem(`weatherWidget`) as any);
  if (storage.length > 3) return alert("Can't add more places");
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
