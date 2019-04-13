import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from 'react-redux';
import { Themes } from "./components/Styles";
import store from "./store";
import App from "./App";

const render = (
  <ThemeProvider theme={Themes.nightmode}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
)

ReactDOM.render(render, document.getElementById("root"));
