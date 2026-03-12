import { dedupLocations } from "./dedupLocations";
import type { GeoLocation } from "../types/GeoLocation";

const loc = (
  name: string,
  country: string,
  state?: string
): GeoLocation => ({ name, country, state, lat: 0, lon: 0 });

describe("dedupLocations", () => {
  it("returns empty array for empty input", () => {
    expect(dedupLocations([])).toEqual([]);
  });

  it("returns locations unchanged when there are no duplicates", () => {
    const locations = [loc("Prague", "CZ"), loc("Barcelona", "ES")];
    expect(dedupLocations(locations)).toEqual(locations);
  });

  it("removes duplicate locations with same name, country, and state", () => {
    const locations = [
      loc("Springfield", "US", "IL"),
      loc("Springfield", "US", "IL"),
    ];
    expect(dedupLocations(locations)).toEqual([loc("Springfield", "US", "IL")]);
  });

  it("keeps locations with the same name but different countries", () => {
    const locations = [loc("London", "GB"), loc("London", "CA")];
    expect(dedupLocations(locations)).toEqual(locations);
  });

  it("keeps locations with the same name and country but different states", () => {
    const locations = [
      loc("Springfield", "US", "IL"),
      loc("Springfield", "US", "MO"),
    ];
    expect(dedupLocations(locations)).toEqual(locations);
  });

  it("treats undefined and missing state the same way", () => {
    const locations = [
      loc("Dubai", "AE"),
      loc("Dubai", "AE", undefined),
    ];
    expect(dedupLocations(locations)).toHaveLength(1);
  });

  it("preserves the first occurrence when deduplicating", () => {
    const first = { ...loc("Prague", "CZ"), lat: 50.08 };
    const second = { ...loc("Prague", "CZ"), lat: 99 };
    expect(dedupLocations([first, second])).toEqual([first]);
  });
});
