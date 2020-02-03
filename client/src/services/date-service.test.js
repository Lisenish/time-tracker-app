import {
  toDayStart,
  toDayEnd,
  getMonday,
  getSunday,
  getFirstDayOfMonth,
  getLastDayOfMonth
} from "./date-service";

test("toDayStart resets date time to 00:00:00)", () => {
  expect(toDayStart(new Date("2020-01-01T12:33:44")).getTime()).toBe(
    new Date("2020-01-01T00:00:00").getTime()
  );
});

test("toDayEnd rests date time to 23:59:59)", () => {
  expect(toDayEnd(new Date("2020-01-01T12:33:44")).getTime()).toBe(
    new Date("2020-01-01T23:59:59").getTime()
  );
});

test("getMonday should return current week Monday's date)", () => {
  expect(getMonday(new Date("2020-02-05")).getTime()).toBe(
    new Date("2020-02-02T21:00:00.000Z").getTime()
  );
});

test("getSunday should return current week Sunday's date)", () => {
  expect(getSunday(new Date("2020-02-05")).getTime()).toBe(
    new Date("2020-02-09T21:00:00.000Z").getTime()
  );
});

test("getFirstDayOfMonth should return current month first date)", () => {
  expect(getFirstDayOfMonth(new Date("2020-02-05")).getTime()).toBe(
    new Date("2020-01-31T21:00:00.000Z").getTime()
  );
});

test("getLastDayOfMonth should return current month last date)", () => {
  expect(getLastDayOfMonth(new Date("2020-02-05")).getTime()).toBe(
    new Date("2020-02-28T21:00:00.000Z").getTime()
  );
});
