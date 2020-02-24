import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTimeLogFilter, loadTimeLogs } from "../actions/time-logs";
import { getFilter, getLoadRange, getTimeLogs } from "../selectors/time-logs";
import TimeLogsTable from "../components/TimeLogsTable";

export default function TimeLogs(props) {
  const dispatch = useDispatch();

  const loadRange = useSelector(getLoadRange);
  const filter = useSelector(getFilter);

  useEffect(() => {
    dispatch(loadTimeLogs(loadRange.from, loadRange.to));
  }, [loadRange, dispatch]);

  const timeLogs = useSelector(getTimeLogs);
  const handleFilterChange = e => dispatch(changeTimeLogFilter(e.target.value));

  return (
    <div {...props}>
      <TimeLogsTable
        timeLogs={timeLogs}
        selectedFilter={filter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
