export const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

if (!OPEN_WEATHER_API_KEY) {
  throw new Error("Missing VITE_OPEN_WEATHER_API_KEY environment variable.");
}

export const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org";
