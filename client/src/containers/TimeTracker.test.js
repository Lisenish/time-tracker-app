import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { renderWithRedux } from "../tests/test-helper";
import TimeTracker from "./TimeTracker";

beforeEach(() => {
  window.localStorage.__proto__.setItem = jest.fn();
  jest.useFakeTimers();
});

test("renders initial timer displayed as 00:00:00", () => {
  const { getByText } = render(renderWithRedux(<TimeTracker />));
  const timer = getByText(/00:00:00/);
  expect(timer).toBeInTheDocument();
});

test("renders stop button after click on play", () => {
  const { getByLabelText } = render(renderWithRedux(<TimeTracker />));

  fireEvent.click(getByLabelText("start"));

  const stopButton = getByLabelText("stop");

  expect(stopButton).toBeInTheDocument();
});

test("renders timer displayed as 00:00:01, 00:00:02 after start", () => {
  const { getByText, getByLabelText } = render(
    renderWithRedux(<TimeTracker />)
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
    renderWithRedux(<TimeTracker />)
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
