import { Coordinates } from "@/types/Place";

const API_KEY = "4635d9ccd0aa7dd5a9ece42020bebb56";

const getUriByPlace = (newPlace: string) =>
  `http://api.openweathermap.org/data/2.5/weather?q=${newPlace}&units=metric&APPID=${API_KEY}`;

const getUriByCoords = (coordinates: Coordinates) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`;

const getWeaterByPlace = async (newPlace: string) => {
  const response = await fetch(getUriByPlace(newPlace));
  return response;
};

const getWeaterByCoords = async (coordinates: Coordinates) => {
  const response = await fetch(getUriByCoords(coordinates));
  return response;
};

export { getWeaterByPlace, getWeaterByCoords };
