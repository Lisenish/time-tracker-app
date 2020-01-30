import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTimeLogs } from "../actions/time-logs";
import { getTimeLogs } from "../selectors/time-logs";
import TimeLogsTable from "./TimeLogsTable";

export default function TimeLogs(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTimeLogs());
  }, [dispatch]);

  const timeLogs = useSelector(getTimeLogs);
  const handleFilterChange = e => console.log(e.target.value);

  return (
    <div {...props}>
      <TimeLogsTable timeLogs={timeLogs} onFilterChange={handleFilterChange} />
    </div>
  );
}
