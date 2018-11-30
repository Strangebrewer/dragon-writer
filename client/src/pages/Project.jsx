import React, { Component, Fragment } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from "styled-components";
import { Page } from "../components/Elements"
import { Button, Input, Label } from "../components/Forms/FormElements";
import TextEditor from "../components/TextEditor";
import { DragonColumn, DragonTextColumn } from "../components/Dragons";
import { API, Scales } from '../utils';

const ColumnContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background: transparent;
`;

const EditorContainer = styled.div`
  width: 100%;
  max-width: 1150px;
  height: 100%;
  padding-right: 200px;
  margin: auto;
`;

class Project extends Component {
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
      singleSubject: '',
    }

  // state = {
  //   create: false,
  //   dragons: true,
  //   subjects: this.props.projectData.subjects,
  //   texts: this.props.projectData.texts,
  //   subjectOrder: this.props.projectData.subjectOrder,
  //   editorOn: false,
  //   singleSubject: '',
  // }

  componentDidMount() {
    // if there is no saved order, then this will load the first three subjects
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

  toggleEdit = text => {
    console.log(text);
    this.setState({
      [text._id]: !this.state[text._id],
      incomingSubject: '',
      incomingText: text
    });
  };

  toggleEditor = toggleObject => {
    console.log(toggleObject);
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
      singleSubject: id,
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
  }

  saveOrder = async () => {
    const { _id } = this.props.project;
    const orderObject = Object.assign({}, { ...this.state }, { editorOn: false, loading: false, dragging: false })
    delete orderObject.texts;
    const updateObj = { order: JSON.stringify(orderObject) }
    await API.updateProject(_id, updateObj);
    this.props.getInitialData(this.props.user);
  };

  updateChangedText = async (newText) => {
    console.log(newText);
    const newState = Scales.updateTextHelper(newText, this.state);
    console.log(newState);
    await this.setState(newState);
    this.saveOrder();
  }

  insertNewText = async (subjectId, newText) => {
    const newState = Scales.insertTextHelper(subjectId, newText, this.state);
    await this.setState(newState);
    this.saveOrder();
  };

  deleteText = async (textId, subjectId, index) => {
    const newState = Scales.deleteTextHelper(textId, subjectId, index, this.state);
    await this.setState(newState);
    this.saveOrder();
  };

  updateSubject = async (id, updateObject) => {
    const newState = Scales.updateSubjectHelper(id, updateObject, this.state);
    await this.setState(newState);
    this.saveOrder();
  };

  deleteSubject = async (id, index) => {
    const newState = Scales.deleteSubjectHelper(id, index, this.state);
    await this.setState(newState);
    this.saveOrder();
  };

  render() {
    const { title, _id, summary } = this.props.project;
    console.log(this.state.subjects);
    const text = this.state.incomingText
      ? JSON.parse(this.state.incomingText.text)
      : null;

    const subjects = this.state.subjectOrder.map(subject => (
      { ...this.state.subjects[subject] }
    ))
    console.log(subjects);
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
      >
        <Page
          authenticated={this.props.authenticated}
          clearAllTopics={this.clearAllTopics}
          create={this.state.create}
          dragons={this.state.dragons}
          dragonTextOn={this.dragonTextOn}
          editorOn={this.state.editorOn}
          logout={this.props.logout}
          mode={this.props.mode}
          nextMode={this.props.nextMode}
          projectId={_id}
          subjects={subjects}
          subtitle={summary}
          title={`Project: ${title}`}
          toggleEditor={this.toggleEditor}
          toggleSubject={this.toggleSubject}
          toggleSubjectForm={this.toggleSubjectForm}
          toggleStyleMode={this.props.toggleStyleMode}
          user={this.props.user}
        >
          {this.state.editorOn
            ? (
              <EditorContainer>
                <TextEditor
                  insertNewText={this.insertNewText}
                  incomingSubject={this.state.incomingSubject}
                  incomingText={this.state.incomingText}
                  projectId={_id}
                  state={this.state}
                  subject={this.state.incomingText.parentSubject}
                  subjects={subjects}
                  thesis={this.state.incomingText.thesis}
                  title={this.state.incomingText.title}
                  text={text}
                  toggleEdit={this.toggleEdit}
                  toggleEditor={this.toggleEditor}
                  updateChangedText={this.updateChangedText}
                />
              </EditorContainer>
            ) : (
              <Droppable
                droppableId="all-subjects"
                direction="horizontal"
                type="subject"
              >
                {provided => (
                  <ColumnContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {this.state.dragons
                      ? (
                        <DragonTextColumn
                          deleteText={this.deleteText}
                          dragonTextOff={this.dragonTextOff}
                          dragonTextOn={this.dragonTextOn}
                          getInitialData={this.props.getInitialData}
                          incomingSubject={this.state.incomingSubject}
                          incomingText={this.state.incomingText}
                          saveOrder={this.saveOrder}
                          state={this.state}
                          subject={this.state.subjects[this.state.singleSubject]}
                          subjects={subjects}
                          texts={this.state.subjects[this.state.singleSubject].textIds
                            .map(textId => (this.state.texts[textId]))}
                          toggleEdit={this.toggleEdit}
                          updateChangedText={this.updateChangedText}
                          user={this.props.user}
                        />
                      ) : (
                        this.state.subjectOrder.map((subjectId, index) => {
                          const subject = this.state.subjects[subjectId];
                          const texts = subject.textIds.map(textId => this.state.texts[textId]);
                          return this.state[subject._id] &&
                            <DragonColumn
                              deleteSubject={this.deleteSubject}
                              deleteText={this.deleteText}
                              dragging={this.state.dragging}
                              dragonTextOn={this.dragonTextOn}
                              getInitialData={this.props.getInitialData}
                              index={index}
                              key={subject._id}
                              loading={this.state.loading}
                              saveOrder={this.saveOrder}
                              subject={subject}
                              texts={texts}
                              toggleEdit={this.toggleEdit}
                              toggleEditor={this.toggleEditor}
                              toggleSubject={this.toggleSubject}
                              updateChangedText={this.updateChangedText}
                              updateSubject={this.updateSubject}
                              user={this.props.user}
                            />
                        })
                      )}
                    {provided.placeholder}
                  </ColumnContainer>
                )}
              </Droppable>
            )}
        </Page>
      </DragDropContext>
    );
  }
}

export default Project;