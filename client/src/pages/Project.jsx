import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from "styled-components";
import { Page } from "../components/Elements"
import TextEditor from "../components/TextEditor";
import { DragonColumn, DragonTextColumn } from "../components/Dragons";
import { API, Scales } from '../utils';
// import { Scales } from "../utils/DragonScales";

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
      subjectTexts: []
    }

  // state = {
  //   create: false,
  //   dragons: true,
  //   subjects: this.props.projectData.subjects,
  //   texts: this.props.projectData.texts,
  //   subjectOrder: this.props.projectData.subjectOrder,
  //   editorOn: false,
  //   singleSubject: '',
  //   subjectTexts: []
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

  toggleEdit = id => {
    this.setState({ [id]: !this.state[id] });
  };

  toggleEditor = () => {
    this.setState({ editorOn: !this.state.editorOn });
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
      const stateObject = Scales.toggleSubjectHelper(this.state, subject)
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
    const newState = Scales.updateTextHelper(newText, this.state);
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

  render() {
    const { title, _id, subjects, summary } = this.props.project;
    return (
      <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate}>
        <Page
          title={`Project: ${title}`}
          subtitle={summary}
          user={this.props.user}
          projectId={_id}
          subjects={subjects}
          toggleSubject={this.toggleSubject}
          logout={this.props.logout}
          toggleSubjectForm={this.toggleSubjectForm}
          toggleEditor={this.toggleEditor}
          editorOn={this.state.editorOn}
          create={this.state.create}
          authenticated={this.props.authenticated}
          clearAllTopics={this.clearAllTopics}
          dragons={this.state.dragons}
          dragonTextOn={this.dragonTextOn}
          mode={this.props.mode}
          nextMode={this.props.nextMode}
          toggleStyleMode={this.props.toggleStyleMode}
        >
          {this.state.editorOn
            ? (
              <EditorContainer>
                <TextEditor
                  projectId={_id}
                  toggleEdit={this.toggleEdit}
                  insertNewText={this.insertNewText}
                  subjects={subjects}
                  toggleEditor={this.toggleEditor}
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
                          subject={this.state.subjects[this.state.singleSubject]}
                          texts={this.state.subjects[this.state.singleSubject].textIds
                            .map(textId => (this.state.texts[textId]))}
                          user={this.props.user}
                          deleteText={this.deleteText}
                          toggleEdit={this.toggleEdit}
                          state={this.state}
                          saveOrder={this.saveOrder}
                          dragonTextOn={this.dragonTextOn}
                          getInitialData={this.props.getInitialData}
                          updateChangedText={this.updateChangedText}
                          dragonTextOff={this.dragonTextOff}
                        />
                      ) : (
                        this.state.subjectOrder.map((subjectId, index) => {
                          const subject = this.state.subjects[subjectId];
                          const texts = subject.textIds.map(textId => this.state.texts[textId]);
                          return this.state[subject._id] &&
                            <DragonColumn
                              key={subject._id}
                              subject={subject}
                              texts={texts}
                              index={index}
                              toggleSubject={this.toggleSubject}
                              deleteText={this.deleteText}
                              toggleEdit={this.toggleEdit}
                              dragonTextOn={this.dragonTextOn}
                              loading={this.state.loading}
                              dragging={this.state.dragging}
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