import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";

const theme = {
  // primary: '#182094',
  // secondary: '#188c94',
  bg: '#062333',
  color: '#b3b3b3',
  button: '#0B4A47',
  link: '#87b3b0',
  linkHover:'#7DBBFF',
  text: "'Josefin Slab', 'Times New Roman', Times, serif",
  heading: "'Fredericka the Great', 'Times New Roman', Times, serif",
  hcolor: '#e0e0e0',
  blood: '#850000',
  black: '#111111',
  grey: '#3a3a3a',
  midGrey: '#d7d7d7',
  lightgrey: '#f2f2f2',
  offwhite: '#ededed',
  maxWidth: '1000px',
  formShadow: 'inset 3px 3px 2px 0 #666, inset -3px -3px 2px 0 #fff',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root"));
