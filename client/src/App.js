import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Provider } from "react-redux";
import TimeLogs from "./containers/TimeLogs";
import TimeTracker from "./containers/TimeTracker";
import store from "./store";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    textAlign: "center",
    minHeight: "100vh",
    padding: theme.spacing(2)
  },
  header: {
    marginBottom: theme.spacing(4)
  },
  tracker: {
    marginBottom: theme.spacing(6)
  }
}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Container maxWidth="md" className={classes.root}>
        <Header className={classes.header} />
        <TimeTracker className={classes.tracker} />
        <TimeLogs />
      </Container>
    </Provider>
  );
}

const Header = props => (
  <Typography {...props} variant="h2">
    Time Tracking App
  </Typography>
);

export default App;
