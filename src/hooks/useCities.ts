import { useState } from "react";

const STORAGE_KEY = "weather-cities";
const DEFAULT_CITIES = ["Prague,CZ", "Barcelona,ES", "Banff,CA", "Dubai,AE"];

function loadCities(): string[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CITIES));
  return DEFAULT_CITIES;
}

export const useCities = () => {
  const [cities, setCities] = useState<string[]>(loadCities);

  const save = (updatedCities: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCities));
    setCities(updatedCities);
  };

  const addCity = (city: string) => {
    const normalized = city.toLowerCase();
    if (!cities.some((c) => c.toLowerCase() === normalized)) {
      save([city, ...cities]);
    }
  };

  const removeCity = (city: string) => {
    save(cities.filter((c) => c !== city));
  };

  return { cities, addCity, removeCity };
};
