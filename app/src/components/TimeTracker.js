import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddAlarmIcon from "@material-ui/icons/AddAlarm";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import React, { useState } from "react";

const useStyles = makeStyles(theme => ({
  buttonMargin: {
    marginRight: theme.spacing(1)
  }
}));

export default function TimeTracker() {
  const classes = useStyles();

  const [isTrackerStarted, setIsTrackerStarted] = useState(false);

  const handleStartTracker = () => setIsTrackerStarted(true);
  const handleStopTracker = () => setIsTrackerStarted(false);

  return (
    <>
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="What are you working on?"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={4} md={1}>
          <Typography variant="body1">00:00:00</Typography>
        </Grid>

        <Grid item xs={8} md={3}>
          {!isTrackerStarted ? (
            <IconButton
              className={classes.buttonMargin}
              aria-label="start"
              onClick={handleStartTracker}
            >
              <PlayArrowIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.buttonMargin}
              aria-label="stop"
              onClick={handleStopTracker}
            >
              <StopIcon />
            </IconButton>
          )}

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddAlarmIcon />}
          >
            Add time-log
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
