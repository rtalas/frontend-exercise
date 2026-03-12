import { useState, useEffect, useRef } from "react";
import { type GeoLocation } from "../types/GeoLocation";
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from "../utils/api";
import { dedupLocations } from "../utils/dedupLocations";

export const useSuggestions = (query: string, debounceMs = 300) => {
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const controller = new AbortController();
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${OPEN_WEATHER_BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(query.trim())}&limit=5&appid=${OPEN_WEATHER_API_KEY}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Geocoding request failed");
        const data: GeoLocation[] = await res.json();
        setSuggestions(dedupLocations(data));
      } catch {
        if (!controller.signal.aborted) setSuggestions([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      controller.abort();
    };
  }, [query, debounceMs]);

  return { suggestions, loading };
};