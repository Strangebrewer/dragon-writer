import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { DragonLogic } from "./components/Renderers";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Project from "./pages/Project";
import { Themes } from "./components/Styles";
import { API, Utils } from "./utils";

let isAuthenticated = false;

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
    let projectOrder = [];
    let projectOrderData = {};

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

      if (user.order) projectOrder = JSON.parse(user.order);
      else projectOrder = user.projects;

      projectOrderData = Utils.formatProjectOrder(projects);

      isAuthenticated = true;
    }

    this.setState({
      projectData,
      projectOrder,
      projectOrderData,
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
    if (this.state.loading) return null;
    return (
      <ThemeProvider theme={this.state.styleMode}>
        <Router>
          <Switch>
            <Route exact path="/">
              {routeProps => (
                <Home
                  {...routeProps}
                  authenticated={isAuthenticated}
                  getInitialData={this.getInitialData}
                  loading={this.state.loading}
                  logout={this.logout}
                  nextMode={this.state.nextMode}
                  projectOrder={this.state.projectOrder}
                  projectOrderData={this.state.projectOrderData}
                  projects={this.state.projects}
                  styleMode={this.state.styleMode}
                  toggleStyleMode={this.toggleStyleMode}
                  user={this.state.user}
                />
              )}
            </Route>

            {/* authentication is not needed for this (these) route(s);
                this.state.projects.length will be 0 unless the user is logged in
                and has created at least one project  */}
            {this.state.projects.length > 0
              && (
                this.state.projects.map((project, index) => (
                  <Route key={project._id} path={`/${project.link}`}>
                    {routeProps => (
                      <DragonLogic
                        getInitialData={this.getInitialData}
                        project={project}
                        projectData={this.state.projectData[index]}
                      >
                        {dragonProps => (
                          <Project
                            {...routeProps}
                            {...dragonProps}
                            authenticated={isAuthenticated}
                            getInitialData={this.getInitialData}
                            loading={this.state.loading}
                            logout={this.logout}
                            nextMode={this.state.nextMode}
                            project={project}
                            styleMode={this.state.styleMode}
                            toggleStyleMode={this.toggleStyleMode}
                            user={this.state.user}
                          />
                        )}
                      </DragonLogic>
                    )}
                  </Route>
                ))
              )}

            <Route path="*" component={NoMatch} />

          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
