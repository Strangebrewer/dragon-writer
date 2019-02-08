import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { API, Scales } from '../../utils';

export class DragonLogic extends Component {
  // if there is a saved order, it will load that; otherwise, it will load the projectData
  // (when a project is first created, there won't be a saved order)
  state = this.props.project.order
    ? (
      Object.assign({ ...this.props.project.order }, {
        create: false,
        dropZoneOn: true,
        editorOn: false,
        inlineTextNew: false,
        loading: false,
        singleSubject: '',
        singleText: '',
        singleTextEdit: false,
      })
    ) : {
      create: false,
      dragons: false,
      dropZoneOn: true,
      editorOn: false,
      inlineTextNew: false,
      subjects: this.props.projectData.subjects,
      subjectOrder: this.props.projectData.subjectOrder,
      singleSubject: '',
      singleSubjectId: '',
      singleText: '',
      singleTextEdit: false,
      storyboardOn: false,
      texts: this.props.projectData.texts,
    }

  // Without this, first login will not show projects.
  componentWillReceiveProps(nextProps) {
    if (nextProps.projectOrder !== this.props.projectOrder) {
      this.setState({
        projectOrder: nextProps.projectOrder,
        projectOrderData: nextProps.projectOrderData
      })
    }
  }

  buildHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { "Authorization": `Bearer ${token}` } };
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

  executeToggles = stateObject => {
    this.setState(stateObject);
  };

  executeDragonStateChanges = async (stateObject, type, text) => {
    await this.setState(stateObject);
    this.saveOrder(type, text);
  };

  saveOrder = async (type, text) => {
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
    const headers = this.buildHeaders();
    const project = await API.updateProject(_id, updateObj, headers);
    
    // passing project to new-text function to account for
    // new texts created in a new project and new column
    switch (type) {
      case 'new-text':
        this.props.addTextToProject(_id, text, project.data)
        break;
      case 'update-text':
        this.props.updateTextInProject(_id, text)
        break;
      default:
        this.props.refreshSingleProjectOrder(_id);
    }

  };

  render() {
    console.log(this.props);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.props.children({
          executeDragonStateChanges: this.executeDragonStateChanges,
          executeToggles: this.executeToggles,
          state: this.state
        })}
      </DragDropContext>
    );
  }
};