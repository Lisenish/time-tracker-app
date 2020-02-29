import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddAlarmIcon from "@material-ui/icons/AddAlarm";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startTracker,
  stopTracker,
  changeSessionName
} from "../actions/tracker";
import { getTrackerState } from "../selectors/tracker";
import formatMsToTimeString from "../services/time-formatter";
import { addTimeLog } from "../actions/time-logs";
import { loadTrackerState } from "../actions/tracker-persistance";

const useStyles = makeStyles(theme => ({
  buttonMargin: {
    marginRight: theme.spacing(1)
  }
}));

export default function TimeTracker({ className }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTrackerState());
  }, [dispatch]);

  const trackerState = useSelector(getTrackerState);

  const elapsedTime = trackerState.elapsedTime;
  const sessionName = trackerState.sessionName;

  const handleStartTracker = () => dispatch(startTracker());
  const handleStopTracker = () => dispatch(stopTracker());

  const handleAddTimeLog = () => dispatch(addTimeLog(sessionName, elapsedTime));

  const handleChangeName = event =>
    dispatch(changeSessionName(event.target.value));

  return (
    <Grid
      className={className}
      container
      spacing={1}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          placeholder="What are you working on?"
          variant="outlined"
          value={sessionName}
          onChange={handleChangeName}
        />
      </Grid>

      <Grid item xs={4} md={1}>
        <Typography variant="body1">
          {formatMsToTimeString(elapsedTime)}
        </Typography>
      </Grid>

      <Grid item xs={8} md={3}>
        <PlayStopButton
          className={classes.buttonMargin}
          isStarted={trackerState.isStarted}
          onPlayClick={handleStartTracker}
          onStopClick={handleStopTracker}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddAlarmIcon />}
          onClick={handleAddTimeLog}
        >
          Add time log
        </Button>
      </Grid>
    </Grid>
  );
}

const PlayStopButton = ({ isStarted, className, onPlayClick, onStopClick }) =>
  !isStarted ? (
    <IconButton className={className} aria-label="start" onClick={onPlayClick}>
      <PlayArrowIcon />
    </IconButton>
  ) : (
    <IconButton className={className} aria-label="stop" onClick={onStopClick}>
      <StopIcon />
    </IconButton>
  );
