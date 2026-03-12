import { render, screen } from "@testing-library/react";
import { Temperature } from "./Temperature";

describe("Temperature", () => {
  const defaultProps = {
    current: 20,
    feelsLike: 18,
    tempMin: 15,
    tempMax: 25,
  };

  it("renders the section label", () => {
    render(<Temperature {...defaultProps} />);
    expect(screen.getByText("Temperature")).toBeVisible();
  });

  it("renders the current temperature", () => {
    render(<Temperature {...defaultProps} />);
    expect(screen.getByText("20°C")).toBeVisible();
  });

  it("renders the feels-like temperature", () => {
    render(<Temperature {...defaultProps} />);
    expect(screen.getByText("Feels like 18°C")).toBeVisible();
  });

  it("renders the min/max temperature range", () => {
    render(<Temperature {...defaultProps} />);
    expect(screen.getByText("15°C - 25°C")).toBeVisible();
  });

  it("renders negative temperatures correctly", () => {
    render(
      <Temperature
        current={-5}
        feelsLike={-10}
        tempMin={-12}
        tempMax={-3}
      />
    );
    expect(screen.getByText("-5°C")).toBeVisible();
    expect(screen.getByText("Feels like -10°C")).toBeVisible();
    expect(screen.getByText("-12°C - -3°C")).toBeVisible();
  });
});
