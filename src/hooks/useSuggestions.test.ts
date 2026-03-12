import { renderHook, waitFor } from "@testing-library/react";
import { useSuggestions } from "./useSuggestions";
import type { GeoLocation } from "../types/GeoLocation";

const mockLocations: GeoLocation[] = [
  { name: "Prague", lat: 50.09, lon: 14.42, country: "CZ", state: "Bohemia" },
  { name: "Prague", lat: 41.66, lon: -72.43, country: "US", state: "Oklahoma" },
];

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

describe("useSuggestions", () => {
  it("starts with empty suggestions and loading=false", () => {
    const { result } = renderHook(() => useSuggestions(""));
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it("clears suggestions and stays not loading when query is empty", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockLocations,
    } as Response);

    const { result, rerender } = renderHook(({ q }) => useSuggestions(q, 0), {
      initialProps: { q: "Prague" },
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.suggestions).toHaveLength(2);

    rerender({ q: "" });

    await waitFor(() => {
      expect(result.current.suggestions).toEqual([]);
      expect(result.current.loading).toBe(false);
    });
  });

  it("sets loading=true while debounce is pending", () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockLocations,
    } as Response);

    const { result } = renderHook(() => useSuggestions("Pra", 500));
    expect(result.current.loading).toBe(true);
  });

  it("fetches and returns suggestions after debounce", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockLocations,
    } as Response);

    const { result } = renderHook(() => useSuggestions("Prague", 0));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.suggestions).toEqual(mockLocations);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("deduplicates locations with the same name, country, and state", async () => {
    const duplicated: GeoLocation[] = [
      ...mockLocations,
      { name: "Prague", lat: 50.1, lon: 14.5, country: "CZ", state: "Bohemia" },
    ];

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => duplicated,
    } as Response);

    const { result } = renderHook(() => useSuggestions("Prague", 0));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.suggestions).toHaveLength(2);
  });

  it("returns empty suggestions on fetch error", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useSuggestions("Prague", 0));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.suggestions).toEqual([]);
  });

  it("returns empty suggestions when response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    const { result } = renderHook(() => useSuggestions("Prague", 0));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.suggestions).toEqual([]);
  });

  it("trims whitespace from the query before fetching", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockLocations,
    } as Response);

    renderHook(() => useSuggestions("  Prague  ", 0));

    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());

    const url = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(url).toContain(encodeURIComponent("Prague"));
  });
});
