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
    projectOrder: this.props.projectOrder,
    projectOrderData: this.props.projectOrderData
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.projectOrder !== this.props.projectOrder) {
      this.setState({
        projectOrder: nextProps.projectOrder,
        projectOrderData: nextProps.projectOrderData
      })
    }
  }

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
    // if (type === 'subject') {
    //   const newState = Scales.dragonSubjectColumns(this.state, source, destination, draggableId);
    //   await this.setState(newState);
    //   this.saveOrder();
    //   return;
    // }

    const newState = Scales.singleProjectDragon(this.state, source, destination, draggableId);
    console.log(newState);
    await this.setState(newState);
    await API.updateUserOrder({ order: JSON.stringify(this.state.projectOrder) });
    this.props.getInitialData();
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
                          projectOrder={this.state.projectOrder}
                          projectOrderData={this.state.projectOrderData}
                          // projects={this.props.projects}
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