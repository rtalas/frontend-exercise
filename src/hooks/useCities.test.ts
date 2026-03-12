import { renderHook, act } from "@testing-library/react";
import { useCities } from "./useCities";

const STORAGE_KEY = "weather-cities";
const DEFAULT_CITIES = ["Prague,CZ", "Barcelona,ES", "Banff,CA", "Dubai,AE"];

beforeEach(() => {
  localStorage.clear();
});

describe("useCities", () => {
  it("loads default cities when localStorage is empty", () => {
    const { result } = renderHook(() => useCities());
    expect(result.current.cities).toEqual(DEFAULT_CITIES);
  });

  it("persists default cities to localStorage on first load", () => {
    renderHook(() => useCities());
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(DEFAULT_CITIES);
  });

  it("loads cities from localStorage when present", () => {
    const saved = ["Tokyo,JP", "Sydney,AU"];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

    const { result } = renderHook(() => useCities());
    expect(result.current.cities).toEqual(saved);
  });

  it("addCity prepends a new city", () => {
    const { result } = renderHook(() => useCities());

    act(() => result.current.addCity("Tokyo,JP"));

    expect(result.current.cities[0]).toBe("Tokyo,JP");
    expect(result.current.cities).toHaveLength(DEFAULT_CITIES.length + 1);
  });

  it("addCity does not add a duplicate city", () => {
    const { result } = renderHook(() => useCities());

    act(() => result.current.addCity("Prague,CZ"));

    expect(result.current.cities).toHaveLength(DEFAULT_CITIES.length);
  });

  it("addCity does not add a case-insensitive duplicate", () => {
    const { result } = renderHook(() => useCities());

    act(() => result.current.addCity("prague,cz"));

    expect(result.current.cities).toHaveLength(DEFAULT_CITIES.length);
  });

  it("addCity persists to localStorage", () => {
    const { result } = renderHook(() => useCities());

    act(() => result.current.addCity("Tokyo,JP"));

    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toContain("Tokyo,JP");
  });

  it("removeCity removes the specified city", () => {
    const { result } = renderHook(() => useCities());

    act(() => result.current.removeCity("Prague,CZ"));

    expect(result.current.cities).not.toContain("Prague,CZ");
    expect(result.current.cities).toHaveLength(DEFAULT_CITIES.length - 1);
  });

  it("removeCity persists to localStorage", () => {
    const { result } = renderHook(() => useCities());

    act(() => result.current.removeCity("Prague,CZ"));

    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).not.toContain("Prague,CZ");
  });

  it("falls back to default cities when localStorage contains invalid JSON", () => {
    localStorage.setItem(STORAGE_KEY, "not-valid-json{{{");

    const { result } = renderHook(() => useCities());

    expect(result.current.cities).toEqual(DEFAULT_CITIES);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(DEFAULT_CITIES);
  });
});
