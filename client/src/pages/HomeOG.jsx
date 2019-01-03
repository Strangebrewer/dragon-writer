import React, { Component } from 'react';
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { ImageUploader, Page } from "../components/PageElements";
import { Authenticate, ProjectList } from "../components/PageElements";
import { API, Scales, Utils } from "../utils"

const Container = styled.div`
  margin: auto;
  padding-right: 200px;
`;

class Home extends Component {
  state = {
    loading: false,
    projectOrder: this.props.projectOrder,
    projectOrderData: this.props.projectOrderData
  };

  // Without this, first login will not show projects,
  // and deleted projects will remain in view until refresh.
  componentWillReceiveProps(nextProps) {
    const { projectOrder, projectOrderData } = nextProps;
    if (nextProps.projectOrder !== this.props.projectOrder)
      this.setState({ projectOrder, projectOrderData });
  }

  onDragEnd = async result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index)
      return;

    const newState = Scales.singleProjectDragon(this.state, source, destination, draggableId);
    await this.setState(newState);
    await API.updateUserOrder({ order: JSON.stringify(this.state.projectOrder) });
    this.props.getInitialData();
  };

  addNewProjectToOrder = async project => {
    const projectOrder = Array.from(this.state.projectOrder);
    projectOrder.unshift(project._id);
    const newState = {
      ...this.state,
      projectOrder,
      projectOrderData: {
        ...this.state.projectOrderData,
        [project._id]: project
      }
    }
    await this.setState(newState);
    await API.updateUserOrder({ order: JSON.stringify(projectOrder) });
    this.props.getInitialData();
  };

  updateProject = async (project, newProjectData, closeModal) => {
    await this.setState({ loading: true });
    const { title, summary, link } = newProjectData;
    const updateObject = {};

    if (title) updateObject.title = title;
    else updateObject.title = project.title;
    if (summary) updateObject.summary = summary;
    else updateObject.summary = project.summary;
    if (link) updateObject.link = link;
    else updateObject.link = project.link;

    await API.updateProject(project._id, updateObject);;
    this.props.getInitialData()
    await this.setState({ loading: false });
    // closeModal();
  };

  deleteProject = async (id, closeModal) => {
    let error;
    await this.setState({ loading: true });
    const projectOrder = Array.from(this.state.projectOrder)
      .filter(projectId => projectId !== id);

    // removing the project from state prevents removes it from view
    // while waiting for the new props from App.jsx
    const projectOrderData = {
      ...this.state.projectOrderData,
    }
    delete projectOrderData[id];

    try {
      await API.updateUserOrder({ order: JSON.stringify(projectOrder) });
      await API.deleteProject(id);
    }
    catch (err) {
      error = err;
    }

    if (!error) {
      this.props.removeProjectFromList(id);
      this.setState({ loading: false });
    }

    closeModal();
  };

  render() {
    console.log(this.props);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Page
          authenticated={this.props.authenticated}
          home
          logout={this.props.logout}
          mode={this.props.mode}
          nextMode={this.props.nextMode}
          title="Dragon Writer"
          subtitle="Drag-and-drop storyboarding for writers"
          toggleStyleMode={this.props.toggleStyleMode}
          user={this.props.user}
        >
          <Container>
            <ImageUploader
              getInitialData={this.props.getInitialData}
              type="project"
            >
              {provided => (
                this.props.authenticated
                  ? (
                    <ProjectList
                      {...provided}
                      addNewProjectToOrder={this.addNewProjectToOrder}
                      authenticated={this.props.authenticated}
                      deleteProject={this.deleteProject}
                      getInitialData={this.props.getInitialData}
                      projectOrder={this.state.projectOrder}
                      projectOrderData={this.state.projectOrderData}
                      updateProject={this.updateProject}
                      user={this.props.user}
                    />
                    // 'loading' prevents the login form from flashing on the screen while the app checks if a user already has a session cookie upon first page load
                  ) : (
                    !this.props.loading &&
                    <Authenticate getInitialData={this.props.getInitialData} />
                  )
              )}
            </ImageUploader>
          </Container>
        </Page>
      </DragDropContext>

    );
  }
}

export default Home;