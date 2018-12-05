import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

class DragonLogic extends Component {
  // if there is a saved order, it will load that; otherwise, it will load the projectData
  // (when a project is first created, there won't be a saved order)
  state = this.props.project.order
    ? this.props.project.order
    : {
      create: false,
      dragons: false,
      subjects: this.props.projectData.subjects,
      texts: this.props.projectData.texts,
      subjectOrder: this.props.projectData.subjectOrder,
      editorOn: false,
      dropZoneOn: true,
      singleSubjectId: '',
      singleSubject: '',
      singleText: '',
      singleTextEdit: false,
      inlineTextNew: false,
    }

  componentDidMount() {
    // if there is no saved order, then this will load the first three columns
    if (!this.props.project.order) {
      const { subjects } = this.props.projectData;
      const keysArray = Object.keys(subjects);
      const stateObj = {};
      for (let i = 0; i < 3; i++) {
        const element = keysArray[i];
        stateObj[element] = true;
      }
      this.setState(stateObj);
    }
  };

  toggleSingleNewEditor = () => {
    this.setState({
      editorOn: !this.state.editorOn,
      dropZoneOn: !this.state.dropZoneOn
    })
  };

  toggleEdit = text => {
    this.setState({
      [text._id]: !this.state[text._id],
      incomingSubject: '',
      incomingText: text
    });
  };

  toggleInlineNew = subject => {
    this.setState({
      singleSubject: subject,
      inlineTextNew: !this.state.inlineTextNew,
      singleTextEdit: false,
      dropZoneOn: !this.state.dropZoneOn,
    })
  }

  toggleSingleEdit = (subject, text) => {
    this.setState({
      singleSubject: subject,
      singleText: text,
      inlineTextNew: false,
      singleTextEdit: !this.state.singleTextEdit,
      dropZoneOn: !this.state.dropZoneOn,
    })
  }

  toggleEditor = toggleObject => {
    const stateObj = {
      editorOn: !this.state.editorOn,
      incomingSubject: '',
      incomingText: '',
    };
    if (toggleObject.text) stateObj.incomingText = toggleObject;
    if (toggleObject.subject) stateObj.incomingSubject = toggleObject;
    this.setState(stateObj);
  };

  toggleSubject = async id => {
    await this.setState({ [id]: !this.state[id] });
    this.saveOrder();
  };

  dragonTextOff = async () => {
    await this.setState({ dragons: false });
    this.saveOrder();
  };

  dragonTextOn = async id => {
    await this.setState({
      dragons: true,
      singleSubjectId: id,
    });
    this.saveOrder();
  };

  toggleSubjectForm = async (created, subject) => {
    if (created === "created") {
      const stateObject = Scales.toggleSubjectHelper(this.state, subject);
      // make sure the new subject is set to 'true' in state so it will appear upon creation
      stateObject[subject._id] = true;
      await this.setState(stateObject);
      this.saveOrder();
    }
    else this.setState({ create: !this.state.create });
  };

  clearAllTopics = async () => {
    const stateObject = Scales.clearTopicsHelper(this.state.subjectOrder)
    await this.setState(stateObject);
    this.saveOrder();
  };

  onDragStart = start => {
    if (start.type !== 'subject') this.setState({ dragging: true });
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

  executeToggles = stateObject => {
    this.setState(stateObject);
  };

  executeDragonStateChanges = async stateObject => {
    await this.setState(stateObject);
    this.saveOrder();
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
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
      >
        {this.props.children({
          executeDragonStateChanges: this.executeDragonStateChanges,
          state: this.state,
          executeToggles: this.executeToggles
        })}
      </DragDropContext>
    );
  }
}

export default DragonLogic;