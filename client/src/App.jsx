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
    projectData: [],
    projectOrder: [],
    projectOrderData: {},
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

      projectOrderData = Utils.formatProjectOrderData(projects);
      isAuthenticated = true;
    }

    this.setState({
      loading: false,
      projectData,
      projectOrder,
      projectOrderData,
      projects,
      user,
    });
  };

  addNewProject = async (projectId, callback) => {
    // add new projectId to the projectOrder and then save it to DB:
    const projectOrder = Array.from(this.state.projectOrder);
    projectOrder.unshift(projectId);
    await API.updateUserOrder({ order: JSON.stringify(projectOrder) });

    // retrieve new project from DB:
    const projectRes = await API.getSingleProjectWithAll(projectId);
    const project = projectRes.data;
    // copy projects from state and add new project to it:
    const projects = JSON.parse(JSON.stringify(this.state.projects));
    projects.unshift(project);

    // copy projectData from state and add teh new project data (after formatting)
    const projectData = JSON.parse(JSON.stringify(this.state.projectData));
    projectData.unshift(Utils.formatInitialData(project));

    // copy projectOrderData from state and add new project (and remove unnecessary data):
    const projectOrderData = JSON.parse(JSON.stringify(this.state.projectOrderData));
    projectOrderData[project._id] = project;
    delete projectOrderData[project._id].order;
    delete projectOrderData[project._id].subjects;
    delete projectOrderData[project._id].texts;

    await this.setState({
      projectData,
      projectOrder,
      projectOrderData,
      projects
    });
    callback();
  }

  refreshProjectList = async () => {
    const res = await API.getUserWithProjects();
    const projects = res.data.projects;
    const projectOrder = JSON.parse(res.data.order);
    const projectOrderData = Utils.formatProjectOrderData(projects);
    this.setState({ projectOrder, projectOrderData });
  };

  refreshSingleProjectOrder = async (projectId) => {
    const res = await API.getSingleProject(projectId);
    const project = res.data;
    const index = Utils.getArrayIndex(this.state.projects, projectId);
    project.texts = this.state.projects[index].texts;
    Utils.addTextsToOrder(project);
    const projects = Array.from(this.state.projects);
    projects.splice(index, 1, project);
    this.setState({ projects });
  };

  removeProjectFromList = async projectId => {
    // clone this.state.projects and remove the project:
    const projects = JSON.parse(JSON.stringify(this.state.projects));
    const projectIndex = Utils.getArrayIndex(projects, projectId);
    projects.splice(projectIndex, 1);
    const projectData = JSON.parse(JSON.stringify(this.state.projectData));
    const projectDataIndex = Utils.getArrayIndex(projectData, projectId);
    projectData.splice(projectDataIndex, 1);

    // clone this.state.projectOrder and this.state.projectOrderData and remove the project:
    const projectOrderData = JSON.parse(JSON.stringify(this.state.projectOrderData));
    delete projectOrderData[projectId];
    const projectOrder = this.state.projectOrder.filter(item => item !== projectId);
    this.setState({ projects, projectData, projectOrder, projectOrderData });
  };

  addTextToProject = async (projectId, text, project) => {
    const projectIndex = Utils.getArrayIndex(this.state.projects, projectId);
    const projects = JSON.parse(JSON.stringify(this.state.projects));
    const order = projects[projectIndex].order;
    order.texts[text._id] = text;
    order.subjects[text.subjectId].textIds.unshift(text._id);
    projects[projectIndex].texts.unshift(text);
    const projectData = JSON.parse(JSON.stringify(this.state.projectData));

    // new project, new column, new text all created at once:
    //  - will return 'texts' from the DB as an empty object
    //      (and for some reason that object is read-only)
    //  - will return without an order field, and
    //  - the order field on the project arg will not have a texts field
    // so, to correct for all of that, the following conditionals:
    const texts = projectData[projectIndex].texts;
    if (!texts.length || typeof texts === 'object') {
      delete projectData[projectIndex].texts;
      projectData[projectIndex].texts = [];
    }
    if (!projectData[projectIndex].order) {
      projectData[projectIndex].order = JSON.parse(project.order);
      projectData[projectIndex].order.texts = {};
    }

    projectData[projectIndex].texts.unshift(text);
    projectData[projectIndex].order.texts[text._id] = text;
    this.setState({ projects, projectData });
  };

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
  };

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
                      addNewProject={this.addNewProject}
                      projectOrder={this.state.projectOrder}
                      projectOrderData={this.state.projectOrderData}
                      refreshProjectList={this.refreshProjectList}
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
