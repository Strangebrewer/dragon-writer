import { combineReducers } from 'redux';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import loggedInReducer from './loggedInReducer';
import projectDataReducer from './projectDataReducer';
import projectOrderReducer from './projectOrderReducer';
import projectOrderDataReducer from './projectOrderDataReducer';
import projectsReducer from './projectsReducer';

const appReducer = combineReducers({
  user: userReducer,
  projects: projectsReducer,
  projectData: projectDataReducer,
  projectOrder: projectOrderReducer,
  projectOrderData: projectOrderDataReducer,
  loading: loadingReducer,
  loggedIn: loggedInReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'UNAUTH_USER') {
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducer;