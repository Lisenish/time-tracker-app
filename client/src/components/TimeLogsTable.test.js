import React from "react";
import renderer from "react-test-renderer";
import TimeLogsTable from "./TimeLogsTable";
import { FilterRange } from "../enums/filterRange";

const testLogs = [
  { id: 1, name: "Test Session", time: 1000, createdAt: new Date("01-01-2020") }
];

test("Table renders correctly with zero state", () => {
  const tree = renderer.create(<TimeLogsTable />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Table renders correctly with empty logs array", () => {
  const tree = renderer.create(<TimeLogsTable testLogs={[]} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Table renders correctly with logs", () => {
  const tree = renderer
    .create(
      <TimeLogsTable timeLogs={testLogs} selectedFilter={FilterRange.DAY} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Table renders correctly selected filter WEEK", () => {
  const tree = renderer
    .create(
      <TimeLogsTable timeLogs={testLogs} selectedFilter={FilterRange.WEEK} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
