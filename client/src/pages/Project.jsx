import React, { Component, Fragment } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from "styled-components";
import { ImageUploader, Page } from "../components/PageElements"
import { InlineNewEditor, SingleNewEditor, SingleUpdateEditor, TextEditor } from "../components/slate/Editors";
import { DragonNest, DragonTextNest } from "../components/Dragons";
import { DragonLair } from "../components/Dragons/DragonElements";
import { API, Scales } from '../utils';

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

  executeToggles = stateObject => {
    this.setState(stateObject);
  };

  executeDragonStateChanges = async stateObject => {
    await this.setState(stateObject);
    this.saveOrder();
  };

  toggleSingleNewEditor = () => {
    const { editorOn, dropZoneOn } = this.state;
    const newState = {
      editorOn: !editorOn,
      dropZoneOn: !dropZoneOn
    }
    this.executeToggles(newState)
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
  };

  toggleSubject = async id => {
    this.executeDragonStateChanges({ [id]: !this.state[id] });
  };

  toggleDragonText = id => {
    const stateObject = {}
    if (id) {
      stateObject.singleSubjectId = id;
      stateObject.dragons = true
    }
    else stateObject.dragons = false;
    this.executeDragonStateChanges(stateObject);
  }

  clearAllTopics = async () => {
    const stateObject = Scales.clearTopicsHelper(this.state.subjectOrder);
    this.executeDragonStateChanges(stateObject)
  };

  // This hasn't been tested yet. I know it's being used, but... 
  // I think it can be cleaned up and simplified.
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

  // This one has been removed from DragonLogic but should remain here
  // since it's used by a few components
  // Also, rewrite it to use the execute function from DragonLogic
  deleteText = async (textId, subjectId, index) => {
    const newState = Scales.deleteTextHelper(textId, subjectId, index, this.state);
    await API.deleteText(textId);
    this.executeDragonStateChanges(newState);
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

  toggleImageInOrder = async newSubject => {
    const newState = {
      ...this.state,
      subjects: {
        ...this.state.subjects,
        [newSubject._id]: {
          ...this.state.subjects[newSubject._id],
          image: newSubject.image,
          largeImage: newSubject.largeImage,
          publicId: newSubject.publicId
        }
      }
    }
    this.setState(newState);
    this.saveOrder();
  };

  render() {
    const { title, _id, summary } = this.props.project;
    const subjects = this.state.subjectOrder
      .map(subject => (
        { ...this.state.subjects[subject] }
      ));

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
          editorOn={this.state.editorOn}
          logout={this.props.logout}
          mode={this.props.mode}
          nextMode={this.props.nextMode}
          projectId={_id}
          subjects={subjects}
          subtitle={summary}
          title={`Project: ${title}`}
          toggleDragonText={this.toggleDragonText}
          toggleSingleNewEditor={this.toggleSingleNewEditor}
          toggleSubject={this.toggleSubject}
          toggleSubjectForm={this.toggleSubjectForm}
          toggleStyleMode={this.props.toggleStyleMode}
          user={this.props.user}
        >

          {this.state.editorOn &&
            <EditorContainer>
              <TextEditor
                executeDragonStateChanges={this.executeDragonStateChanges}
                callback={this.toggleSingleNewEditor}
                projectId={_id}
                state={this.state}
              >
                {editorProps => (
                  <SingleNewEditor
                    {...editorProps}
                    subjects={subjects}
                    toggleSingleNewEditor={this.toggleSingleNewEditor}
                  />
                )}
              </TextEditor>
            </EditorContainer>
          }

          {this.state.inlineTextNew &&
            <TextEditor
              callback={this.toggleInlineNew}
              executeDragonStateChanges={this.executeDragonStateChanges}
              projectId={this.props.project._id}
              subject={this.state.singleSubject}
              state={this.state}
            >
              {editorProps => (
                <InlineNewEditor
                  {...editorProps}
                  texts={this.state.singleSubject.textIds.map(textId => this.state.texts[textId])}
                  toggleInlineNew={this.toggleInlineNew}
                />
              )}

            </TextEditor>}

          {this.state.singleTextEdit &&
            <TextEditor
              callback={this.toggleSingleEdit}
              executeDragonStateChanges={this.executeDragonStateChanges}
              state={this.state}
              subject={this.state.singleSubject}
              text={JSON.parse(this.state.singleText.text)}
              title={this.state.singleText.title}
              thesis={this.state.singleText.thesis}
            >
              {editorProps => (
                <SingleUpdateEditor
                  {...editorProps}
                  text={this.state.singleText}
                  texts={this.state.singleSubject.textIds.map(textId => this.state.texts[textId])}
                  toggleSingleEdit={this.toggleSingleEdit}
                />
              )}
            </TextEditor>}

          {this.state.dropZoneOn &&
            <DragonLair>
              {this.state.dragons
                ? (
                  <Fragment>
                    <DragonTextNest
                      deleteText={this.deleteText}
                      executeDragonStateChanges={this.executeDragonStateChanges}
                      getInitialData={this.props.getInitialData}
                      incomingSubject={this.state.incomingSubject}
                      incomingText={this.state.incomingText}
                      saveOrder={this.saveOrder}
                      state={this.state}
                      subject={this.state.subjects[this.state.singleSubjectId]}
                      subjects={subjects}
                      texts={this.state.subjects[this.state.singleSubjectId].textIds
                        .map(textId => (this.state.texts[textId]))}
                      toggleDragonText={this.toggleDragonText}
                      user={this.props.user}
                    />
                  </Fragment>
                ) : (
                  <ImageUploader
                    getInitialData={this.props.getInitialData}
                    toggleImageInOrder={this.toggleImageInOrder}
                    type="subject"
                  >
                    {provided => (
                      this.state.subjectOrder.map((subjectId, index) => {
                        const subject = this.state.subjects[subjectId];
                        const texts = subject.textIds.map(textId => this.state.texts[textId]);
                        return this.state[subject._id] &&
                          <DragonNest
                            {...provided}
                            deleteText={this.deleteText}
                            dragging={this.state.dragging}
                            executeDragonStateChanges={this.executeDragonStateChanges}
                            getInitialData={this.props.getInitialData}
                            index={index}
                            key={subject._id}
                            saveOrder={this.saveOrder}
                            state={this.state}
                            subject={subject}
                            texts={texts}
                            toggleDragonText={this.toggleDragonText}
                            toggleInlineNew={this.toggleInlineNew}
                            toggleSingleEdit={this.toggleSingleEdit}
                            toggleSubject={this.toggleSubject}
                            user={this.props.user}
                          />
                      })
                    )}
                  </ImageUploader>
                )}
            </DragonLair>}
        </Page>
      </DragDropContext>
    );
  }
}

export default Project;