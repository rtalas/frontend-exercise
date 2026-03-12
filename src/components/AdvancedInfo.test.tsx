import { render, screen } from "@testing-library/react";
import { AdvancedInfo, type AdvancedInfoType } from "./AdvancedInfo";

describe("AdvancedInfo", () => {
  it("renders the type label", () => {
    render(<AdvancedInfo type="Pressure" value="1013 hPa" />);
    expect(screen.getByText("Pressure")).toBeVisible();
  });

  it("renders the value", () => {
    render(<AdvancedInfo type="Pressure" value="1013 hPa" />);
    expect(screen.getByText("1013 hPa")).toBeVisible();
  });

  it.each<AdvancedInfoType>(["Pressure", "Humidity", "Wind", "Visibility"])(
    "renders %s type without crashing",
    (type) => {
      render(<AdvancedInfo type={type} value="test value" />);
      expect(screen.getByText(type)).toBeVisible();
      expect(screen.getByText("test value")).toBeVisible();
    }
  );
});
