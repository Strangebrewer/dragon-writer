import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Project from "./pages/Project";
import { Themes } from "./components/Styles";
import { AddPropsToRoute, API, Utils } from "./utils";

let isAuthenticated = false;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}>
    {routeProps => (
      isAuthenticated
        ? <Component {...routeProps} />
        : <Redirect to="/" />
    )}
  </Route>
);

class App extends Component {
  state = {
    projects: [],
    user: null,
    loading: true,
    styleMode: Themes.brightmode,
    nextMode: 'Night'
  };

  componentDidMount() {
    this.getInitialData();
  };

  toggleStyleMode = modeInput => {
    let stateObj = {};
    if (modeInput === "Bright") {
      stateObj.styleMode = Themes.brightmode;
      stateObj.nextMode = "Night";
    }
    if (modeInput === "Night") {
      stateObj.styleMode = Themes.nightmode;
      stateObj.nextMode = "Fright";
    }
    if (modeInput === "Fright") {
      stateObj.styleMode = Themes.frightmode;
      stateObj.nextMode = "Bright";
    }
    this.setState(stateObj);
  }

  getInitialData = async (userInfo) => {
    let projects = [];
    let user = userInfo;
    let error;
    let projectData = [];

    if (!user)
      try {
        const userResponse = await API.getUser();
        // do this (immediately below) to keep user consistent with the way
        // userInfo is passed to this function in order to avoid excess db requests.
        user = userResponse.data;
      }
      catch (err) {
        error = err;
      }

    if (!error && user._id) {
      const projectsRes = await API.getProjects();
      projects = projectsRes.data;

      projects.forEach(project => {
        if (project.order)
          projectData.push(Utils.addTextsToOrder(project));

        else
          projectData.push(Utils.formatInitialData(project));
      });

      isAuthenticated = true;
    }

    this.setState({
      projectData,
      loading: false,
      projects,
      user,
    });
  }

  logout = event => {
    if (event) event.preventDefault();
    API.logout();
    isAuthenticated = false;
    this.setState({ user: null, });
  };

  render() {
    return (
      <ThemeProvider theme={this.state.styleMode}>
        <Router>
          <Switch>
            <Route exact path="/">
              {routeProps => (
                <Home
                  {...routeProps}
                  authenticated={isAuthenticated}
                  user={this.state.user}
                  projects={this.state.projects}
                  getInitialData={this.getInitialData}
                  logout={this.logout}
                  loading={this.state.loading}
                  styleMode={this.state.styleMode}
                  nextMode={this.state.nextMode}
                  toggleStyleMode={this.toggleStyleMode}
                />
              )}
            </Route>

            {this.state.projects.length > 0
              && (
                this.state.projects.map((project, index) => (
                  <PrivateRoute
                    key={project._id}
                    path={`/${project.link}`}
                    component={AddPropsToRoute(Project, {
                      authenticated: isAuthenticated,
                      user: this.state.user,
                      project: project,
                      projectData: this.state.projectData[index],
                      getInitialData: this.getInitialData,
                      logout: this.logout,
                      loading: this.state.loading,
                      styleMode: this.state.styleMode,
                      nextMode: this.state.nextMode,
                      toggleStyleMode: this.toggleStyleMode,
                    })}
                  />
                ))
              )}

            <Route
              path="*"
              render={routeProps => (
                !this.state.loading &&
                <NoMatch
                  {...routeProps}
                  authenticated={isAuthenticated}
                  logout={this.logout}
                  loading={this.state.loading}
                  styleMode={this.state.styleMode}
                  nextMode={this.state.nextMode}
                  toggleStyleMode={this.toggleStyleMode}
                />
              )}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
