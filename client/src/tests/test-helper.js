import React from "react";
import { Provider } from "react-redux";
import { createTimeTrackerStore } from "../store";

export const renderWithRedux = (
  component,
  store = createTimeTrackerStore()
) => <Provider store={store}>{component}</Provider>;
