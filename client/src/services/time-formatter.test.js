import formatMsToTimeString from "./time-formatter";

test("returns correct string for 1000 ms", () => {
  expect(formatMsToTimeString(1000)).toBe("00:00:01");
});

test("returns correct string for 1 minute ms", () => {
  expect(formatMsToTimeString(60000)).toBe("00:01:00");
});

test("returns correct string for 1 hour ms", () => {
  expect(formatMsToTimeString(3600000)).toBe("01:00:00");
});

test("returns correct string for 15:37:25 ms", () => {
  expect(formatMsToTimeString(56245000)).toBe("15:37:25");
});

test("returns correct string for ms > 1 day", () => {
  expect(formatMsToTimeString(99445000)).toBe("27:37:25");
});
