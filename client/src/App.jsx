import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Project from "./pages/Project";
import Editor from "./pages/Editor";
import API from "./utils/API";
import { Utils } from "./utils/Utils";
import AddPropsToRoute from "./utils/AddPropsToRoute";

let isAuthenticated = false;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: "/", state: { from: props.location, loginShow: true } }} />
    )}
  />
);

class App extends Component {
  state = {
    projects: [],
    subjects: [],
    links: [],
    user: null,
    loading: true,
  };

  componentDidMount() {
    this.getInitialData();
  };

  getInitialData = async (auth, userInfo) => {
    let projects = [];
    let subjects = [];
    let user = userInfo;
    let error;
    let projectData = [];

    if (!user)
      try {
        const userResponse = await API.getUser();
        // do this to keep user consistent with the way
        // userInfo is passed to this function
        // in order to avoid excess db requests.
        user = userResponse.data;
      } catch (err) {
        error = err;
      }

    if (!error && user._id) {
      const projectsRes = await API.getProjects();
      projects = projectsRes.data;
      const subjectsRes = await API.getSubjects();
      subjects = subjectsRes.data;
      projects.forEach(project => {
        projectData.push(Utils.formatInitialData(project));
      });
      isAuthenticated = true;
    }

    this.setState({
      projectData,
      loading: false,
      projects,
      subjects,
      user,
    });
  }

  logout = event => {
    if (event) event.preventDefault();
    API.logout();
    isAuthenticated = false;
    this.setState({ user: null, });
  };

  getTexts = async () => {
    const texts = await API.getTexts()
    this.setState({ texts: texts.data });
  };

  getSubjects = async () => {
    const subjects = await API.getSubjects()
    this.setState({ subjects: subjects.data });
  };

  getProjects = async () => {
    const projects = await API.getProjects();
    this.setState({ projects: projects.data });
  };

  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/"
              render={
                routeProps => (
                  <Home
                    {...routeProps}
                    authenticated={isAuthenticated}
                    user={this.state.user}
                    links={this.state.links}
                    projects={this.state.projects}
                    subjects={this.state.subjects}
                    getProjects={this.getProjects}
                    getSubjects={this.getSubjects}
                    getTexts={this.getTexts}
                    getInitialData={this.getInitialData}
                    logout={this.logout}
                    loading={this.state.loading}
                  />
                )
              }
            />

            <PrivateRoute
              path="/editor"
              component={AddPropsToRoute(Editor, {
                authenticated: isAuthenticated,
                user: this.state.user,
                links: this.state.links,
                projects: this.state.projects,
                getProjects: this.getProjects,
                getSubjects: this.getSubjects,
                getTexts: this.getTexts,
                getInitialData: this.getInitialData,
                logout: this.logout,
                loading: this.state.loading
              })}
            />

            {this.state.projects.length > 0
              && (
                this.state.projects.map((project, index) => (
                  <PrivateRoute
                    key={project._id}
                    path={`/${project.link}`}
                    component={AddPropsToRoute(Project, {
                      authenticated: isAuthenticated,
                      user: this.state.user,
                      links: this.state.links,
                      project: project,
                      projectData: this.state.projectData[index],
                      subjects: this.state.subjects,
                      getProjects: this.getProjects,
                      getSubjects: this.getSubjects,
                      getTexts: this.getTexts,
                      getInitialData: this.getInitialData,
                      logout: this.logout,
                      loading: this.state.loading
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
                />
              )}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
