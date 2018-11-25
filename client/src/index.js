import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";

const theme = {
  // primary: '#182094',
  // secondary: '#188c94',
  bg: '#062333',
  bgLite: '#17303d',
  color: '#d7d7d7',
  button: '#0b4a47',
  link: '#87b3b0',
  linkHover:'#7DBBFF',
  text: "'Josefin Slab', 'Times New Roman', Times, serif",
  heading: "'Fredericka the Great', 'Times New Roman', Times, serif",
  hcolor: '#e0e0e0',
  blood: '#850000',
  black: '#111111',
  grey: '#3a3a3a',
  midGrey: '#b3b3b3',
  lightgrey: '#f2f2f2',
  offwhite: '#ededed',
  maxWidth: '1000px',
  formShadow: 'inset 3px 3px 2px 0 #666, inset -3px -3px 2px 0 #fff',
  formShine: 'inset 3px 3px 2px 0 #fff, inset -3px -3px 2px 0 #666, inset -1px -1px 1px 0 #062333',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  columnBs: '0 0 30px #7DBBFF, 0 0 20px #7DBBFF, 0 0 15px #7DBBFF, 0 0 10px #7DBBFF, 0 0 5px #7DBBFF, 0 0 2px #7DBBFF, inset 0 0 5px 0 #7DBBFF',
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root"));
