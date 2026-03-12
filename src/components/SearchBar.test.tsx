import { render, screen, fireEvent, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";
import type { GeoLocation } from "../types/GeoLocation";

vi.mock("../hooks/useSuggestions");
import { useSuggestions } from "../hooks/useSuggestions";

const mockSuggestions: GeoLocation[] = [
  { name: "Prague", lat: 50.09, lon: 14.42, country: "CZ", state: "Bohemia" },
  { name: "Prague", lat: 41.66, lon: -72.43, country: "US", state: "Oklahoma" },
];

beforeEach(() => {
  vi.mocked(useSuggestions).mockReturnValue({ suggestions: [], loading: false });
});

describe("SearchBar", () => {
  it("renders the search input", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByRole("combobox")).toBeVisible();
    expect(screen.getByPlaceholderText("Search for a city (e.g. London)")).toBeVisible();
  });

  it("dropdown is not visible initially", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows suggestions when typing", () => {
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: mockSuggestions, loading: false });
    render(<SearchBar onSearch={vi.fn()} />);
    typeInInput("Pra");
    expect(screen.getAllByText("Prague")).toHaveLength(2);
    expect(screen.getAllByRole("option")).toHaveLength(2);
  });

  it("shows state and country alongside city name in each suggestion", () => {
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: mockSuggestions, loading: false });
    render(<SearchBar onSearch={vi.fn()} />);
    typeInInput("Pra");
    expect(screen.getByText("Bohemia, CZ")).toBeVisible();
    expect(screen.getByText("Oklahoma, US")).toBeVisible();
  });

  it("shows 'Searching...' while loading", () => {
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: [], loading: true });
    render(<SearchBar onSearch={vi.fn()} />);
    typeInInput("Pra");
    expect(screen.getByText("Searching...")).toBeVisible();
  });

  it("shows 'No cities found' when no suggestions and query length > 1", () => {
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: [], loading: false });
    render(<SearchBar onSearch={vi.fn()} />);
    typeInInput("Xyz");
    expect(screen.getByText("No cities found")).toBeVisible();
  });

  it("does not show 'No cities found' for single-character queries", () => {
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: [], loading: false });
    render(<SearchBar onSearch={vi.fn()} />);
    typeInInput("X");
    expect(screen.queryByText("No cities found")).not.toBeInTheDocument();
  });

  it("calls onSearch with 'Name,Country' when a suggestion is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: mockSuggestions, loading: false });
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    typeInInput("Pra");
    await user.click(within(screen.getAllByRole("option")[0]).getByRole("button"));
    expect(onSearch).toHaveBeenCalledWith("Prague,CZ");
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("closes the dropdown after selecting a suggestion", async () => {
    const user = userEvent.setup();
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: mockSuggestions, loading: false });
    render(<SearchBar onSearch={vi.fn()} />);
    typeInInput("Pra");
    await user.click(within(screen.getAllByRole("option")[0]).getByRole("button"));
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("updates the input value to the formatted location after selection", async () => {
    const user = userEvent.setup();
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: mockSuggestions, loading: false });
    render(<SearchBar onSearch={vi.fn()} />);
    typeInInput("Pra");
    await user.click(within(screen.getAllByRole("option")[0]).getByRole("button"));
    expect(screen.getByRole("combobox")).toHaveValue("Prague, Bohemia, CZ");
  });

  it("closes the dropdown on Escape", async () => {
    const user = userEvent.setup();
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: mockSuggestions, loading: false });
    render(<SearchBar onSearch={vi.fn()} />);
    typeInInput("Pra");
    expect(screen.getAllByRole("option")).toHaveLength(2);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("navigates suggestions with ArrowDown and ArrowUp", async () => {
    const user = userEvent.setup();
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: mockSuggestions, loading: false });
    render(<SearchBar onSearch={vi.fn()} />);
    typeInInput("Pra");
    const options = screen.getAllByRole("option");

    await user.keyboard("{ArrowDown}");
    expect(options[0]).toHaveAttribute("aria-selected", "true");
    expect(options[1]).toHaveAttribute("aria-selected", "false");

    await user.keyboard("{ArrowDown}");
    expect(options[0]).toHaveAttribute("aria-selected", "false");
    expect(options[1]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowUp}");
    expect(options[0]).toHaveAttribute("aria-selected", "true");
  });

  it("wraps ArrowDown at the last suggestion back to the first", async () => {
    const user = userEvent.setup();
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: mockSuggestions, loading: false });
    render(<SearchBar onSearch={vi.fn()} />);
    typeInInput("Pra");
    const options = screen.getAllByRole("option");

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    expect(options[0]).toHaveAttribute("aria-selected", "true");
  });

  it("selects the active suggestion on Enter", async () => {
    const user = userEvent.setup();
    vi.mocked(useSuggestions).mockReturnValue({ suggestions: mockSuggestions, loading: false });
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    typeInInput("Pra");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");
    expect(onSearch).toHaveBeenCalledWith("Prague,CZ");
  });
});

const typeInInput = (value: string) => {
  const input = screen.getByRole("combobox");
  act(() => {
    input.focus();
    fireEvent.change(input, { target: { value } });
  });
  return input;
};