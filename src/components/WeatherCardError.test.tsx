import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WeatherCardError } from "./WeatherCardError";

describe("WeatherCardError", () => {
  it("renders the 'Weather Unavailable' heading", () => {
    render(<WeatherCardError error="City not found" />);
    expect(screen.getByText("Weather Unavailable")).toBeVisible();
  });

  it("renders the provided error message", () => {
    render(<WeatherCardError error="City not found" />);
    expect(screen.getByText("City not found")).toBeVisible();
  });

  it("renders a different error message", () => {
    render(<WeatherCardError error="Failed to fetch weather: 404 Not Found" />);
    expect(
      screen.getByText("Failed to fetch weather: 404 Not Found")
    ).toBeVisible();
  });

  it("renders a remove button when city and onRemove are provided", () => {
    render(<WeatherCardError error="City not found" city="Prague,CZ" onRemove={vi.fn()} />);
    expect(screen.getByLabelText("Remove Prague,CZ")).toBeVisible();
  });

  it("calls onRemove with the city when the remove button is clicked", async () => {
    const onRemove = vi.fn();
    render(<WeatherCardError error="City not found" city="Prague,CZ" onRemove={onRemove} />);
    await userEvent.click(screen.getByLabelText("Remove Prague,CZ"));
    expect(onRemove).toHaveBeenCalledWith("Prague,CZ");
  });

  it("does not render a remove button when city and onRemove are not provided", () => {
    render(<WeatherCardError error="City not found" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
