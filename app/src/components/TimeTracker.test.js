import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { storeCreator } from "../store";
import TimeTracker from "./TimeTracker";

let testStore;

beforeEach(() => {
  window.localStorage.__proto__.setItem = jest.fn();
  testStore = storeCreator();

  jest.useFakeTimers();
});

test("renders initial timer displayed as 00:00:00", () => {
  const { getByText } = render(reduxify(<TimeTracker />, testStore));
  const timer = getByText(/00:00:00/);
  expect(timer).toBeInTheDocument();
});

test("renders stop button after click on play", () => {
  const { getByLabelText } = render(reduxify(<TimeTracker />, testStore));

  fireEvent.click(getByLabelText("start"));

  const stopButton = getByLabelText("stop");

  expect(stopButton).toBeInTheDocument();
});

test("renders timer displayed as 00:00:01, 00:00:02 after start", () => {
  const { getByText, getByLabelText } = render(
    reduxify(<TimeTracker />, testStore)
  );

  fireEvent.click(getByLabelText("start"));

  jest.advanceTimersByTime(1000);
  var timer = getByText(/00:00:01/);
  expect(timer).toBeInTheDocument();

  jest.advanceTimersByTime(2000);
  timer = getByText(/00:00:03/);

  expect(timer).toBeInTheDocument();
});

test("renders timer displayed as 00:00:04 after start and then stop", () => {
  const { getByText, getByLabelText } = render(
    reduxify(<TimeTracker />, testStore)
  );

  fireEvent.click(getByLabelText("start"));

  jest.advanceTimersByTime(4000);
  let timer = getByText(/00:00:04/);
  expect(timer).toBeInTheDocument();

  fireEvent.click(getByLabelText("stop"));
  jest.advanceTimersByTime(2000);
  timer = getByText(/00:00:04/);

  expect(timer).toBeInTheDocument();
});

const reduxify = (component, store) => (
  <Provider store={store}>{component}</Provider>
);
