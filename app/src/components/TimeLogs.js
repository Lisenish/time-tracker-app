import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import TimeLogsTable from "./TimeLogsTable";
import { useSelector, useDispatch } from "react-redux";
import { getTimeLogs } from "../selectors/time-logs";
import { loadTimeLogs } from "../actions/time-logs";

export default function TimeLogs(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTimeLogs());
  }, [dispatch]);

  const timeLogs = useSelector(getTimeLogs);

  return (
    <div {...props}>
      <Typography variant="h5">Time sessions logs</Typography>

      <TimeLogsTable timeLogs={timeLogs} />
    </div>
  );
}
