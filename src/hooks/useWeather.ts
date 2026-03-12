import { useState, useEffect } from "react";
import { type WeatherData } from "../types/WeatherData";
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from "../utils/api";

export const useWeather = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${OPEN_WEATHER_BASE_URL}/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch weather: ${res.status} ${res.statusText}`);
        }
        const parsedData = await res.json();
        setData(parsedData);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    
    getData();
    
    return () => controller.abort();
  }, [city]);

  return { data, loading, error };
};
