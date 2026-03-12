import { render, screen } from "@testing-library/react";
import { WeatherCardHeader } from "./WeatherCardHeader";

describe("WeatherCardHeader", () => {
  const defaultProps = {
    cityName: "Prague",
    weatherDescription: "clear sky",
    icon: "01d",
  };

  it("renders the city name", () => {
    render(<WeatherCardHeader {...defaultProps} />);
    expect(screen.getByText("Prague")).toBeVisible();
  });

  it("renders the weather description", () => {
    render(<WeatherCardHeader {...defaultProps} />);
    expect(screen.getByText("clear sky")).toBeVisible();
  });

  it("renders the weather icon with the correct src", () => {
    render(<WeatherCardHeader {...defaultProps} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/01d@4x.png"
    );
  });

  it("uses the provided icon code in the image URL", () => {
    render(<WeatherCardHeader {...defaultProps} icon="10n" />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/10n@4x.png"
    );
  });
});
