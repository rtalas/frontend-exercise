import type { WeatherData } from "../types/WeatherData";

export const mockWeatherData: WeatherData = {
  coord: { lon: 14.42, lat: 50.09 },
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
  main: {
    temp: 20,
    feels_like: 18,
    temp_min: 15,
    temp_max: 25,
    pressure: 1013,
    humidity: 55,
    sea_level: 1013,
    grnd_level: 1000,
  },
  visibility: 10000,
  wind: { speed: 3.5, deg: 180 },
  sys: { country: "CZ", sunrise: 1620000000, sunset: 1620050000 },
  timezone: 7200,
  id: 3067696,
  name: "Prague",
};