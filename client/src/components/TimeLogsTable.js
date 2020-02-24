import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FilterRange } from "../enums/filterRange";
import formatMsToTimeString from "../services/time-formatter";

const useStyle = makeStyles({
  filter: {
    minWidth: "120px",
    marginLeft: "auto"
  }
});

export default function TimeLogsTable({
  timeLogs,
  selectedFilter = FilterRange.DAY,
  onFilterChange
}) {
  const classes = useStyle();

  return (
    <TableContainer component={Paper}>
      <TableToolbar
        className={classes.filter}
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChange}
      />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Session name</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {timeLogs && timeLogs.length ? (
            timeLogs.map(createTimeLogRow)
          ) : (
            <EmptyState />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TableToolbar({ className, selectedFilter, onFilterChange }) {
  return (
    <Toolbar>
      <Typography variant="h5">Time sessions</Typography>

      <FormControl className={className}>
        <InputLabel id="filter-select-label">Filter</InputLabel>
        <Select
          id="filter-select"
          labelId="filter-select-label"
          value={selectedFilter}
          onChange={onFilterChange}
        >
          <MenuItem value={FilterRange.DAY}>Day</MenuItem>
          <MenuItem value={FilterRange.WEEK}>Week</MenuItem>
          <MenuItem value={FilterRange.MONTH}>Month</MenuItem>
        </Select>
      </FormControl>
    </Toolbar>
  );
}

function EmptyState() {
  return (
    <TableRow>
      <TableCell colSpan={3} align="center">
        No recorded sessions
      </TableCell>
    </TableRow>
  );
}

function createTimeLogRow(timeLog) {
  return (
    <TableRow key={timeLog.id}>
      <TableCell component="th" scope="row">
        {timeLog.name || "Unnamed session"}
      </TableCell>
      <TableCell align="right">{formatMsToTimeString(timeLog.time)}</TableCell>
      <TableCell align="right">
        {timeLog.createdAt.toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
}
