import { createStore, compose } from 'redux';
import rootReducer from './reducers/index';

const defaultState = {
  projects: [],
  projectData: [],
  projectOrder: [],
  projectOrderData: {},
  user: null,
  loading: true,
  loggedIn: false,
  retarded: 'yes'
}

// this gives Redux in chrome dev tools access to this app's Redux store
const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export default store;