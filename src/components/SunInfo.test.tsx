import { render, screen } from "@testing-library/react";
import { SunInfo } from "./SunInfo";
import { formatTime } from "../utils/formatTime";

describe("SunInfo", () => {
  const sunriseTime = 1620000000; // 2021-05-03 ~00:00 UTC
  const sunsetTime = 1620050000;  // 2021-05-03 ~13:53 UTC
  const timezoneOffset = 7200;    // UTC+2 (e.g. Prague)

  it("renders the Sunrise label", () => {
    render(<SunInfo sunriseTime={sunriseTime} sunsetTime={sunsetTime} timezoneOffset={timezoneOffset} />);
    expect(screen.getByText("Sunrise")).toBeVisible();
  });

  it("renders the Sunset label", () => {
    render(<SunInfo sunriseTime={sunriseTime} sunsetTime={sunsetTime} timezoneOffset={timezoneOffset} />);
    expect(screen.getByText("Sunset")).toBeVisible();
  });

  it("renders the formatted sunrise time", () => {
    render(<SunInfo sunriseTime={sunriseTime} sunsetTime={sunsetTime} timezoneOffset={timezoneOffset} />);
    expect(screen.getByText(formatTime(sunriseTime, timezoneOffset))).toBeVisible();
  });

  it("renders the formatted sunset time", () => {
    render(<SunInfo sunriseTime={sunriseTime} sunsetTime={sunsetTime} timezoneOffset={timezoneOffset} />);
    expect(screen.getByText(formatTime(sunsetTime, timezoneOffset))).toBeVisible();
  });
});
