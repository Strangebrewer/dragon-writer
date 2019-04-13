import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/reducers/index';
import promiseMiddleware from 'redux-promise-middleware';

const defaultState = {
  projects: [],
  projectData: [],
  projectOrder: [],
  projectOrderData: {},
  user: null,
  loading: true,
  loggedIn: false
}

// this gives Redux in chrome dev tools access to this app's Redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(promiseMiddleware)));

export default store;