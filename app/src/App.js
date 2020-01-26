import Container from "@material-ui/core/Container";
import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import TimeTracker from "./components/TimeTracker";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md" className="App">
        <Header />
        <TimeTracker />
      </Container>
    </Provider>
  );
}

const Header = () => <h1>Time tracking App</h1>;

export default App;
