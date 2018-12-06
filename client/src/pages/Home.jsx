import React, { Component } from 'react';
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { ImageUploader, Page } from "../components/PageElements";
import { Authenticate, ProjectCard } from "../components/PageElements";
import { API, Scales } from "../utils"

const Container = styled.div`
  padding-right: 220px;
  padding-left: 20px;
  margin: auto;
`;

class Home extends Component {
  state = {
    projectOrder: this.props.projectOrder,
    projectOrderData: this.props.projectOrderData
  };

  // Without this, first login will not show projects.
  componentWillReceiveProps(nextProps) {
    if (nextProps.projectOrder !== this.props.projectOrder) {
      this.setState({
        projectOrder: nextProps.projectOrder,
        projectOrderData: nextProps.projectOrderData
      })
    }
  }

  onDragEnd = async result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    const newState = Scales.singleProjectDragon(this.state, source, destination, draggableId);
    await this.setState(newState);
    await API.updateUserOrder({ order: JSON.stringify(this.state.projectOrder) });
    // Call this without passing user data in it so it will request new user data, which will
    // this.props.getInitialData();
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
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
          <Container>
            <ImageUploader
              getInitialData={this.props.getInitialData}
              type="project"
            >
              {({ uploadImageModal, imageModal, loading }) => (
                this.props.authenticated
                  ? (
                    <ProjectCard
                      uploadImageModal={uploadImageModal}
                      loading={loading}
                      imageModal={imageModal}
                      authenticated={this.props.authenticated}
                      getInitialData={this.props.getInitialData}
                      projectOrder={this.state.projectOrder}
                      projectOrderData={this.state.projectOrderData}
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