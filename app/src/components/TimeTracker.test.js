import { render } from "@testing-library/react";
import TimeTracker from "./TimeTracker";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";

//TODO: move creating of mock store and comp wrapping to utils
test("renders initial timer displayed as 00:00:00)", () => {
  const { getByText } = render(
    <Provider store={store}>
      <TimeTracker />
    </Provider>
  );
  const timer = getByText(/00:00:00/);
  expect(timer).toBeInTheDocument();
});
