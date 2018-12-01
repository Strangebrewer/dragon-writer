import React, { Fragment, PureComponent } from 'react';
import styled from "styled-components";
import { Page, Modal } from "../components/PageElements";
import { Login, Signup } from "../components/Forms";
import { Button, Input, TextArea } from "../components/Forms/FormElements";
import ProjectCard from "../components/ProjectCard";
import { API } from '../utils';

const Container = styled.div`
  padding-right: 200px;
  margin: auto;
`;

class Home extends PureComponent {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    create: false,
    title: '',
    summary: '',
    link: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    signup: false,
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  closeModal = () => {
    this.setState({
      modal: { isOpen: false }
    });
  };

  setModal = modalInput => {
    this.setState({
      modal: {
        isOpen: true,
        body: modalInput.body,
        buttons: modalInput.buttons
      }
    });
  };

  outsideClick = event => {
    // the space in this is necessary because the outer div is the only one that will have a space after 'modal' in the classname.
    if (event.target.className.includes("modal "))
      this.closeModal();
  };

  toggleSignupForm = () => {
    this.setState({ signup: !this.state.signup });
  };

  signup = async () => {
    const { confirmPassword, email, password, username } = this.state;
    const user = await API.signup({
      username, email, password
    });
    console.log(user);
    if (!user.data.error && user.data._id) this.login();
  };

  login = async () => {
    const { username, password } = this.state;
    const user = await API.login({ username, password });
    if (user)
      this.props.getInitialData(user.data);
  };

  toggleProjectForm = () => {
    this.setState({ create: !this.state.create });
  }

  createProject = () => {
    API.createProject({
      title: this.state.title,
      summary: this.state.summary,
      link: this.state.link
    }).then(() => {
      this.props.getInitialData(this.props.user);
      this.setState({ create: false });
    })
      .catch(err => console.log(err));
  }

  updateProject = project => {
    const { title, summary, link } = this.state;
    const updateObject = {};
    if (title) updateObject.title = title;
    else updateObject.title = project.title;
    if (summary) updateObject.summary = summary;
    else updateObject.summary = project.summary;
    if (link) updateObject.link = link;
    else updateObject.link = project.link;
    API.updateProject(project._id, updateObject)
      .then(() => {
        this.props.getInitialData(this.props.user)
        this.closeModal();
      })
  };

  updateProjectModal = project => {
    this.setModal({
      body: (
        <Fragment>
          <Input
            type="text"
            name="title"
            onChange={this.handleInputChange}
            placeholder="project title"
          />
          <TextArea
            type="text"
            name="summary"
            onChange={this.handleInputChange}
            placeholder="project summary"
          />
          <Input
            name="link"
            type="text"
            maxLength="12"
            onChange={this.handleInputChange}
            placeholder="project keyword (12 characters max)"
          />
        </Fragment>
      ),
      buttons: (
        <Fragment>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button onClick={() => this.updateProject(project)}>Submit</Button>
        </Fragment>
      )
    })
  };

  deleteProjectModal = async id => {
    console.log(id);
    this.setModal({
      body: <h3>Are you sure you want to delete this entire project and all associated texts and topic columns?</h3>,
      buttons: (
        <Fragment>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button onClick={() => this.deleteProject(id)}>Yes, Delete</Button>
        </Fragment>
      )
    })
  };

  deleteProject = async id => {
    await API.deleteProject(id);
    await this.props.getInitialData(this.props.user);
    this.closeModal();
  }
    ;
  render() {
    return (
      <Page
        title="Dragon Writer"
        subtitle="Drag-and-drop storyboarding for writers"
        size="large"
        user={this.props.user}
        logout={this.props.logout}
        authenticated={this.props.authenticated}
        home="true"
        mode={this.props.mode}
        nextMode={this.props.nextMode}
        toggleStyleMode={this.props.toggleStyleMode}
      >
        <Modal
          show={this.state.modal.isOpen}
          closeModal={this.closeModal}
          body={this.state.modal.body}
          buttons={this.state.modal.buttons}
          outsideClick={this.outsideClick}
          handleInputChange={this.handleInputChange}
        />
        <Container>
          {this.props.authenticated
            ? (
              <ProjectCard
                projects={this.props.projects}
                updateProjectModal={this.updateProjectModal}
                getInitialData={this.props.getInitialData}
                create={this.state.create}
                user={this.props.user}
                toggleProjectForm={this.toggleProjectForm}
                authenticated={this.props.authenticated}
                deleteProjectModal={this.deleteProjectModal}
              />
              // 'loading' prevents the login form from flashing on the screen while the app checks if a user already has a session cookie upon first page load
            ) : (
              !this.props.loading && !this.state.signup
                ? (
                  <Login
                    getInitialData={this.props.getInitialData}
                    handleInputChange={this.handleInputChange}
                    login={this.login}
                    username={this.state.username}
                    password={this.state.password}
                    toggleSignupForm={this.toggleSignupForm}
                  />
                ) : (
                  !this.props.loading &&
                  <Signup
                    getInitialData={this.props.getInitialData}
                    handleInputChange={this.handleInputChange}
                    signup={this.signup}
                    username={this.state.username}
                    password={this.state.password}
                    confirmPassword={this.state.confirmPassword}
                    email={this.state.email}
                    toggleSignupForm={this.toggleSignupForm}
                  />
                ))}
        </Container>
      </Page>
    );
  }
}

export default Home;