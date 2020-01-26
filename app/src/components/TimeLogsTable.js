import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import formatMsToTimeString from "../services/time-formatter";

export default function TimeLogsTable({ timeLogs }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Session name</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeLogs.map(log => (
            <TableRow key={log.id}>
              <TableCell component="th" scope="row">
                {log.name}
              </TableCell>
              <TableCell align="right">
                {formatMsToTimeString(log.time)}
              </TableCell>
              <TableCell align="right">
                {log.createdAt.toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
