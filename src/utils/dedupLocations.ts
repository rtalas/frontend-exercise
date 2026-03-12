import type { GeoLocation } from "../types/GeoLocation";

export function dedupLocations(locations: GeoLocation[]): GeoLocation[] {
  const seen = new Set<string>();
  return locations.filter((loc) => {
    const key = `${loc.name}|${loc.country}|${loc.state ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}