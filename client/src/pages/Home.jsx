import React, { Fragment, PureComponent } from 'react';
import styled from "styled-components";
import Page from "../components/Elements/Page";
import { NewProject, Login } from "../components/Elements/Forms";
import { Button, Input, TextArea } from "../components/Elements/FormElements";
import Modal from "../components/Elements/Modal";
import ProjectCard from "../components/ProjectCard";
import API from '../utils/API';

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
    username: '',
    password: '',
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

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

  login = async () => {
    const { username, password } = this.state;
    const user = await API.login({ username, password });
    if (user)
      this.props.getInitialData(true, user.data);
  };

  outsideClick = event => {
    // the space in this is necessary because the outer div is the only one that will have a space after 'modal' in the classname.
    if (event.target.className.includes("modal "))
      this.closeModal();
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
      this.props.getInitialData(true, this.props.user);
      this.setState({ create: false });
    })
      .catch(err => console.log(err));
  }

  updateProject = project => {
    const { title, summary, link } = this.state;
    const updateObject = { };
    if (title) updateObject.title = title;
    else updateObject.title = project.title;
    if (summary) updateObject.summary = summary;
    else updateObject.summary = project.summary;
    if (link) updateObject.link = link;
    else updateObject.link = project.link;
    API.updateProject(project._id, updateObject)
      .then(() => {
        this.props.getInitialData(true, this.props.user)
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
            onChange={this.andleInputChange}
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
  }

  render() {
    return (
      <Page
        title="Home Page!"
        user={this.props.user}
        logout={this.props.logout}
        authenticated={this.props.authenticated}
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
                create={this.state.create}
                user={this.props.user}
                getProjects={this.props.getProjects}
                toggleProjectForm={this.toggleProjectForm}
                authenticated={this.props.authenticated}
              />
              // displayLogin prevents the login form from flashing on the screen while the app checks if a user already has a session cookie upon first page load
            ) : (!this.props.loading &&
              <Login
                getInitialData={this.props.getInitialData}
                handleInputChange={this.handleInputChange}
                login={this.login}
                username={this.state.username}
                password={this.state.password}
              />
            )}
        </Container>


      </Page>
    );
  }
}

export default Home;