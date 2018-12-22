import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Project from "../../pages/Project"
import { API, Scales } from '../../utils';

export class DragonLogic extends Component {
  // if there is a saved order, it will load that; otherwise, it will load the projectData
  // (when a project is first created, there won't be a saved order)
  state = this.props.project.order
    ? (
      Object.assign({...this.props.project.order}, {
        create: false,
        editorOn: false,
        dropZoneOn: true,
        singleSubject: '',
        singleText: '',
        singleTextEdit: false,
        inlineTextNew: false,
      })
    ) : {
      create: false,
      dragons: false,
      subjects: this.props.projectData.subjects,
      texts: this.props.projectData.texts,
      subjectOrder: this.props.projectData.subjectOrder,
      editorOn: false,
      storyboardOn: false,
      dropZoneOn: true,
      singleSubjectId: '',
      singleSubject: '',
      singleText: '',
      singleTextEdit: false,
      inlineTextNew: false,
    }

  executeToggles = stateObject => {
    this.setState(stateObject);
  };

  executeDragonStateChanges = async stateObject => {
    await this.setState(stateObject);
    this.saveOrder();
  };

  onDragStart = () => {
    console.log("WTF");
  }

  onDragEnd = async result => {
    await this.setState({ loading: true });
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      await this.setState({ loading: false });
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      await this.setState({ loading: false });
      return;
    }

    // if you are dragging one of the subject columns, the type will be "subject"
    if (type === 'subject') {
      const newState = Scales.dragonSubjectColumns(this.state, source, destination, draggableId);
      this.executeDragonStateChanges(newState);
      return;
    }

    const start = this.state.subjects[source.droppableId];
    const finish = this.state.subjects[destination.droppableId];

    // if source column and destination column are the same:
    if (start === finish) {
      const newState = Scales.singleSubjectDragon(this.state, start, source, destination, draggableId);
      this.executeDragonStateChanges(newState);
      return;
    }

    // if moving to a new column:
    const newState = Scales.multiSubjectDragon(this.state, start, finish, source, destination, draggableId);
    this.executeDragonStateChanges(newState);
    return;
  };

  saveOrder = async () => {
    const { _id } = this.props.project;
    const orderObject = { ...this.state };

    delete orderObject.create;
    delete orderObject.editorOn;
    delete orderObject.dropZoneOn;
    delete orderObject.singleSubject;
    delete orderObject.singleText;
    delete orderObject.singleTextEdit;
    delete orderObject.texts;
    delete orderObject.loading;
    delete orderObject.dragging;
    delete orderObject.inlineTextNew;
    const updateObj = { order: JSON.stringify(orderObject) };

    await API.updateProject(_id, updateObj);
    this.props.getInitialData(this.props.user);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
        <Project
          authenticated={this.props.authenticated}
          executeDragonStateChanges={this.executeDragonStateChanges}
          executeToggles={this.executeToggles}
          getInitialData={this.props.getInitialData}
          loading={this.props.loading}
          logout={this.props.logout}
          nextMode={this.props.nextMode}
          project={this.props.project}
          state={this.state}
          styleMode={this.props.styleMode}
          toggleStyleMode={this.props.toggleStyleMode}
          user={this.props.user}
        />
      </DragDropContext>
    );
  }
};