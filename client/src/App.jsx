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
      const projectsRes = await API.getProjectsWithAll();
      projects = projectsRes.data;

      projects.forEach(project => {
        if (project.order) {
          projectData.push(Utils.addTextsToOrder(project));
        }
        else {
          projectData.push(Utils.formatInitialData(project));
        }
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
  };

  // getInitialData above gets ALL data (including the overwhelmingly largest chunk: all texts)
  // But there's no need to fetch texts every time the order is rearranged
  // So this method only fetches the project being rearranged and then adds existing text data
  refreshSingleProjectOrder = async (projectId) => {
    const res = await API.getSingleProject(projectId);
    const project = res.data;
    const index = Utils.getArrayIndex(this.state.projects, projectId);
    project.texts = this.state.projects[index].texts;
    Utils.addTextsToOrder(project);
    const projects = Array.from(this.state.projects);
    projects.splice(index, 1, project);
    this.setState({ projects });
  }

  removeProjectFromList = async projectId => {
    // clone state objects:
    const projects = JSON.parse(JSON.stringify(this.state.projects));
    const projectIndex = Utils.getArrayIndex(projects, projectId);
    const projectOrderData = JSON.parse(JSON.stringify(this.state.projectOrderData));

    // remove project from cloned state items:
    const projectOrder = this.state.projectOrder.filter(item => item !== projectId);
    projects.splice(projectIndex, 1);
    delete projectOrderData[projectId];

    this.setState({ projects, projectOrder, projectOrderData });
  }

  addTextToProject = async (projectId, text) => {
    const projectIndex = Utils.getArrayIndex(this.state.projects, projectId);
    const projects = JSON.parse(JSON.stringify(this.state.projects));
    const order = projects[projectIndex].order;
    order.texts[text._id] = text;
    order.subjects[text.subjectId].textIds.unshift(text._id);
    projects[projectIndex].texts.unshift(text);
    const projectData = JSON.parse(JSON.stringify(this.state.projectData));
    projectData[projectIndex].texts.unshift(text);
    projectData[projectIndex].order.texts[text._id] = text;
    this.setState({ projects, projectData });
  }

  updateTextInProject = async (projectId, text) => {
    const projectIndex = Utils.getArrayIndex(this.state.projects, projectId);
    const projects = JSON.parse(JSON.stringify(this.state.projects));
    const order = projects[projectIndex].order;    
    order.texts[text._id] = text;
    const textIndex = Utils.getArrayIndex(projects[projectIndex].texts, text._id);
    projects[projectIndex].texts.splice(textIndex, 1, text)
    const projectData = JSON.parse(JSON.stringify(this.state.projectData));
    projectData[projectIndex].order.texts[text._id] = text;
    this.setState({ projects, projectData });
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
                      removeProjectFromList={this.removeProjectFromList}
                    />
                  ) : <Redirect to="/" />
              )}
            </Route>

            {this.state.projects.length > 0
              && (
                this.state.projects.map((project, index) => (
                  <Route key={project._id} path={`/${project.link}`}>
                    {routeProps => (
                      isAuthenticated
                        ? (
                          <DragonLogic
                            addTextToProject={this.addTextToProject}
                            getInitialData={this.getInitialData}
                            project={project}
                            projectData={this.state.projectData[index]}
                            refreshSingleProjectOrder={this.refreshSingleProjectOrder}
                            updateTextInProject={this.updateTextInProject}
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
