export interface Place {
  coord: Coordinates,
  weather: Weather[],
  base: string,
  main: Main,
  visibility: number,
  wind: Main,
  clouds: Main,
  dt: number,
  sys: Sys,
  timezone: number,
  id: number,
  name: string,
  code: number,
}

 export interface Coordinates {
  lon: number,
  lat: number,
}
 interface Weather {
    id: 804;
    main: string;
    description: string;
    icon: string;
}
 interface Sys {
  country: string,
  sunrise: number,
  sunset: number,
}

interface Main {
  [key: string]: number,
}

