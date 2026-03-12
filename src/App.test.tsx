import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./hooks/useCities");
vi.mock("./components/WeatherCard", () => ({
  WeatherCard: ({ city }: { city: string }) => <div data-testid="weather-card">{city}</div>,
}));
vi.mock("./components/SearchBar", () => ({
  SearchBar: () => <input data-testid="search-bar" />,
}));

import { useCities } from "./hooks/useCities";

const defaultMock = {
  cities: ["Prague,CZ", "Barcelona,ES"],
  addCity: vi.fn(),
  removeCity: vi.fn(),
};

beforeEach(() => {
  vi.mocked(useCities).mockReturnValue(defaultMock);
});

describe("App", () => {
  it("renders the search bar", () => {
    render(<App />);
    expect(screen.getByTestId("search-bar")).toBeVisible();
  });

  it("renders a WeatherCard for each city", () => {
    render(<App />);
    const cards = screen.getAllByTestId("weather-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Prague,CZ");
    expect(cards[1]).toHaveTextContent("Barcelona,ES");
  });

  it("renders no cards when cities list is empty", () => {
    vi.mocked(useCities).mockReturnValue({ ...defaultMock, cities: [] });
    render(<App />);
    expect(screen.queryByTestId("weather-card")).not.toBeInTheDocument();
  });
});
