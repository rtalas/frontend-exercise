import { formatTime } from "./formatTime";

describe("formatTime", () => {
  it("returns a string containing hours and minutes", () => {
    const result = formatTime(1620000000, 0);

    expect(result).toMatch(/^\d{1,2}:\d{2}\s?(AM|PM)?$/);
  });

  it("returns different times for different timestamps", () => {
    const t1 = formatTime(1620000000, 0);
    const t2 = formatTime(1620003600, 0); // 1 hour later
    expect(t1).not.toBe(t2);
  });

  it("returns the same time for the same timestamp", () => {
    expect(formatTime(1620000000, 0)).toBe(formatTime(1620000000, 0));
  });

  it("adjusts time based on timezone offset", () => {
    const utcTime = formatTime(1620000000, 0);
    const offsetTime = formatTime(1620000000, 3600); // UTC+1
    expect(utcTime).not.toBe(offsetTime);
  });
});
