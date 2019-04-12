import React from 'react';
import { render } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

const storeProvider = (
  <Provider store={store}>
    <App />
  </Provider>
);