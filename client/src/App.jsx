import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { DragonLogic } from "./components/Renderers";
import Home from "./pages/HomeOG";
import Landing from "./pages/Landing";
import Print from "./pages/Print";
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
    // this.getInitialData();
    this.getProjectData();
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

  getProjectData = async () => {
    let user;
    let error;
    let projectOrder = [];
    let projectOrderData = {};

    try {
      const userResponse = await API.getUserWithProjects();
      // do this (immediately below) to keep user consistent with the way
      // userInfo is passed to this function in order to avoid excess db requests.
      user = userResponse.data;
    }
    catch (err) {
      error = err;
    }

    if (!error && user._id) {

      if (user.order) projectOrder = JSON.parse(user.order);
      else projectOrder = user.projects.map(project => project._id);

      projectOrderData = Utils.formatProjectOrder(user.projects);
      isAuthenticated = true;
    }

    const projects = user.projects;
    projects.forEach(project => {
      console.log(JSON.parse(project.order));
      // const order = JSON.parse(project.order);
      // project.order = order;
    });
    
    console.log(projects);

    await this.setState({
      projectOrder,
      projectOrderData,
      loading: false,
      projects,
      user,
    });

    this.getRestOfTheData();
  };

  getRestOfTheData = async () => {
    let projectData = [];

    const projectsRes = await API.getProjectsWithAll();
    const projects = projectsRes.data;

    projects.forEach(project => {
      if (project.order) {
        projectData.push(Utils.addTextsToOrder(project));
      }
      else
        projectData.push(Utils.formatInitialData(project));
    });

    console.log(projectData);

    this.setState({ projectData });
  };

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
      const projectsRes = await API.getProjectsWithAll();
      projects = projectsRes.data;

      projects.forEach(project => {
        if (project.order) {
          projectData.push(Utils.addTextsToOrder(project));
        }
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
    const sharedProps = {
      authenticated: isAuthenticated,
      getInitialData: this.getInitialData,
      loading: this.state.loading,
      logout: this.logout,
      nextMode: this.state.nextMode,
      toggleStyleMode: this.toggleStyleMode,
      user: this.state.user
    }

    if (this.state.loading) return null;

    return (
      <ThemeProvider theme={this.state.styleMode}>
        <Router>
          <Switch>
            <Route exact path="/">
              {routeProps => (
                <Landing {...routeProps} {...sharedProps} />
              )}
            </Route>

            <Route exact path="/home">
              {routeProps => (
                isAuthenticated
                  ? (
                    <Home
                      {...routeProps}
                      {...sharedProps}
                      projectOrder={this.state.projectOrder}
                      projectOrderData={this.state.projectOrderData}
                    // projects={this.state.projects}
                    />
                  ) : <Redirect to="/" />
              )}
            </Route>

            {(this.state.projects.length > 0 && this.state.projectData)
              && (
                this.state.projects.map((project, index) => (
                  <Route key={project._id} path={`/${project.link}`}>
                    {routeProps => (
                      isAuthenticated
                        ? (
                          <DragonLogic
                            getInitialData={this.getInitialData}
                            project={project}
                            projectData={this.state.projectData[index]}
                          >
                            {dragonProps => (
                              <Project
                                {...routeProps}
                                {...dragonProps}
                                {...sharedProps}
                                project={project}
                              />
                            )}
                          </DragonLogic>
                        ) : <Redirect to="/" />
                    )}
                  </Route>
                ))
              )}

            <Route path="/print" component={Print} />

            <Route path="*" component={NoMatch} />

          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
