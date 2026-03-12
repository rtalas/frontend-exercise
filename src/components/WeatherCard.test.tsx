import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WeatherCard } from "./WeatherCard";
import { useWeather } from "../hooks/useWeather";
import { mockWeatherData } from "./WeatherCard.fixtures";

vi.mock("../hooks/useWeather");
vi.mock("./WeatherCardSkeleton", () => ({
  WeatherCardSkeleton: () => <div data-testid="weather-skeleton" />,
}));

beforeEach(() => {
  vi.mocked(useWeather).mockReturnValue({ data: null, loading: false, error: null });
});

describe("WeatherCard", () => {
  it("shows the skeleton while loading", () => {
    vi.mocked(useWeather).mockReturnValue({ data: null, loading: true, error: null });
    render(<WeatherCard city="Prague,CZ" onRemove={vi.fn()} />);
    expect(screen.getByTestId("weather-skeleton")).toBeVisible();
    expect(screen.queryByLabelText("Remove Prague,CZ")).not.toBeInTheDocument();
  });

  it("shows the error card when there is an error", () => {
    vi.mocked(useWeather).mockReturnValue({
      data: null,
      loading: false,
      error: "Failed to fetch weather: 404 Not Found",
    });
    render(<WeatherCard city="Prague,CZ" onRemove={vi.fn()} />);
    expect(screen.getByText("Weather Unavailable")).toBeVisible();
    expect(screen.getByText("Failed to fetch weather: 404 Not Found")).toBeVisible();
    expect(screen.getByLabelText("Remove Prague,CZ")).toBeVisible();
  });

  it("shows 'No weather data available' when data is null and there is no error", () => {
    vi.mocked(useWeather).mockReturnValue({ data: null, loading: false, error: null });
    render(<WeatherCard city="Prague,CZ" onRemove={vi.fn()} />);
    expect(screen.getByText("No weather data available.")).toBeVisible();
  });

  it("renders city name and weather details when data is available", () => {
    vi.mocked(useWeather).mockReturnValue({ data: mockWeatherData, loading: false, error: null });
    render(<WeatherCard city="Prague,CZ" onRemove={vi.fn()} />);
    expect(screen.getByText("Prague")).toBeVisible();
    expect(screen.getByText("clear sky")).toBeVisible();
    expect(screen.getByText("20°C")).toBeVisible();
  });

  it("renders all advanced info sections when data is available", () => {
    vi.mocked(useWeather).mockReturnValue({ data: mockWeatherData, loading: false, error: null });
    render(<WeatherCard city="Prague,CZ" onRemove={vi.fn()} />);
    expect(screen.getByText("1013 hPa")).toBeVisible();
    expect(screen.getByText("55%")).toBeVisible();
    expect(screen.getByText("3.5 m/s, 180°")).toBeVisible();
    expect(screen.getByText("10.0 km")).toBeVisible();
  });

  it("calls onRemove with the city when the remove button is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(useWeather).mockReturnValue({ data: mockWeatherData, loading: false, error: null });
    const onRemove = vi.fn();
    render(<WeatherCard city="Prague,CZ" onRemove={onRemove} />);
    await user.click(screen.getByLabelText("Remove Prague,CZ"));
    expect(onRemove).toHaveBeenCalledWith("Prague,CZ");
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
