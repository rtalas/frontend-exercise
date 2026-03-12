import { renderHook, waitFor } from "@testing-library/react";
import { useWeather } from "./useWeather";
import { mockWeatherData } from "./useWeather.fixtures";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

describe("useWeather", () => {
  it("starts with loading=true and no data", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockWeatherData,
    } as Response);

    const { result } = renderHook(() => useWeather("Prague,CZ"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it("returns data on successful fetch", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockWeatherData,
    } as Response);

    const { result } = renderHook(() => useWeather("Prague,CZ"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockWeatherData);
    expect(result.current.error).toBeNull();
  });

  it("sets error when response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as Response);

    const { result } = renderHook(() => useWeather("Unknown"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Failed to fetch weather: 404 Not Found");
  });

  it("sets error when fetch throws", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useWeather("Prague,CZ"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Network error");
  });

  it("refetches when city changes", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockWeatherData,
    } as Response);

    const { result, rerender } = renderHook(({ city }) => useWeather(city), {
      initialProps: { city: "Prague,CZ" },
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetch).toHaveBeenCalledTimes(1);

    rerender({ city: "Barcelona,ES" });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
