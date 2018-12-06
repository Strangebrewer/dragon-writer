import React, { Component } from 'react';
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Page } from "../components/PageElements";
import { ModalLogic, UploadLogic } from "../components/Renderers";
import { Authenticate, ProjectCard } from "../components/PageElements";
import { API, Scales, Utils } from "../utils"

const Container = styled.div`
  padding-right: 220px;
  padding-left: 20px;
  margin: auto;
`;

class Home extends Component {
  state = {

  };

  onDragEnd = async result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    // if you are dragging one of the subject columns, the type will be "subject"
    if (type === 'subject') {
      const newState = Scales.dragonSubjectColumns(this.state, source, destination, draggableId);
      await this.setState(newState);
      this.saveOrder();
      return;
    }

    const start = this.state.subjects[source.droppableId];
    const finish = this.state.subjects[destination.droppableId];

    // if source column and destination column are the same:
    if (start === finish) {
      const newState = Scales.singleSubjectDragon(this.state, start, source, destination, draggableId);
      await this.setState(newState);
      this.saveOrder();
      return;
    }

    // if moving to a new column:
    const newState = Scales.multiSubjectDragon(this.state, start, finish, source, destination, draggableId);
    await this.setState(newState);
    this.saveOrder();
    return;
  };

  saveOrder = async () => {
    const { _id } = this.props.project;
    const orderObject = Object.assign({},
      { ...this.state },
      { editorOn: false, loading: false, dragging: false, dropZoneOn: true });

    delete orderObject.texts;
    const updateObj = { order: JSON.stringify(orderObject) };

    await API.updateProject(_id, updateObj);
    this.props.getInitialData(this.props.user);
  };

  render() {
    return (
      <DragDropContext>
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
            <ModalLogic>
              {modalProps => (
                this.props.authenticated
                  ? (
                    <UploadLogic
                      {...modalProps}
                      getInitialData={this.props.getInitialData}
                      type="project"
                    >
                      {provided => (
                        <ProjectCard
                          {...modalProps}
                          {...provided}
                          authenticated={this.props.authenticated}
                          getInitialData={this.props.getInitialData}
                          projects={this.props.projects}
                          user={this.props.user}
                        />
                      )}
                    </UploadLogic>
                    // 'loading' prevents the login form from flashing on the screen while the app checks if a user already has a session cookie upon first page load
                  ) : (
                    !this.props.loading &&
                    <Authenticate getInitialData={this.props.getInitialData} />
                  )
              )}
            </ModalLogic>
          </Container>
        </Page>
      </DragDropContext>

    );
  }
}

export default Home;