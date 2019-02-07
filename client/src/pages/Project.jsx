import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { ImageUploader, Page } from "../components/PageElements"
import { EditorLogic, ModalLogic } from "../components/Renderers";
import { InlineNewEditor, SingleNewEditor, SingleUpdateEditor } from "../components/slate/Editors";
import { Storyboard } from "../components/Storyboard";
import { DragonColumn, DragonFullTextColumn } from "../components/Dragons";
import { MainDropZone } from "../components/Dragons/DragonElements";
import { API, Scales, Toggle } from '../utils';

const EditorContainer = styled.div`
  height: 100%;
  margin: auto;
  max-width: 1450px;
  padding-right: 200px;
  width: 100%;
`;

const StoryboardContainer = styled.div`
  height: 100%;
  margin: auto;
  padding-right: 150px;
  position: relative;
  width: 100%;
`;

const EmptyProjectText = styled.div`
  margin-top: 100px;
  padding-right: 200px;
  text-align: center;
  width: 100%;
  h2 {
    font-size: 5rem;
    padding-bottom: 12px;
  }
  h3 {
    font-size: 2rem;
  }
`;

class Project extends Component {

  componentDidMount() {
    // if there is no saved order, then this will load the first three columns
    // This can be deleted once the project is finished (I think)
    //   because adding a subject (a column) creates a project.order.
    const { order, subjects } = this.props.project;
    if (!order && subjects && subjects.length > 0) {
      const stateObj = {};
      let length;
      if (subjects.length < 3) length = subjects.length;
      else length = 3;
      for (let i = 0; i < length; i++) {
        stateObj[subjects[i]._id] = true;
      }
      this.props.executeDragonStateChanges(stateObj);
    }
  };

  toggleSingleNewEditor = () => {
    const {
      editorOn,
      dropZoneOn,
      inlineTextNew,
      singleTextEdit
    } = this.props.state;
    const newState = Toggle
      .singleNew(editorOn, dropZoneOn, inlineTextNew, singleTextEdit);
    this.props.executeToggles(newState)
  };

  toggleInlineNew = subject => {
    const { inlineTextNew, dropZoneOn } = this.props.state;
    const newState = Toggle.inlineNew(subject, inlineTextNew, dropZoneOn)
    this.props.executeToggles(newState);
  }

  toggleSingleEdit = (subject, text) => {
    const { singleTextEdit, dropZoneOn } = this.props.state;
    const newState = Toggle.singleEdit(subject, text, singleTextEdit, dropZoneOn);
    this.props.executeToggles(newState);
  };

  toggleSubject = async id => {
    this.props.executeDragonStateChanges({ [id]: !this.props.state[id] });
  };

  toggleDragonText = id => {
    const newState = Toggle.dragonText(id)
    this.props.executeDragonStateChanges(newState);
  }

  toggleStoryboard = id => {
    const newState = Toggle.storyboard(id);
    this.props.executeDragonStateChanges(newState);
  }

  clearAllTopics = async () => {
    const newState = Scales.clearTopicsHelper(this.props.state.subjectOrder);
    this.props.executeDragonStateChanges(newState)
  };

  addSubjectToOrder = (subject) => {
    const newState = Scales.addSubjectToOrder(this.props.state, subject);
    this.props.executeDragonStateChanges(newState);
  }

  toggleSubjectForm = () => {
    this.props.executeToggles({ create: !this.props.state.create });
  };

  // This should remain here since it's used by a few components
  deleteText = async (textId, subjectId, index) => {
    const newState = Scales.deleteTextHelper(textId, subjectId, index, this.props.state);
    await API.deleteText(textId);
    this.props.executeDragonStateChanges(newState);
  };

  addImageToProject = project => {
    const newState = Scales.addImageToProject(project, this.props.state);
    this.props.executeDragonStateChanges(newState);
  }

  addImageToSubject = subject => {
    const newState = Scales.addImageToSubject(subject, this.props.state);
    this.props.executeDragonStateChanges(newState);
  };

  addImageToText = text => {
    const newState = Scales.addImageToText(text, this.props.state);
    this.props.executeDragonStateChanges(newState, "update-text", text);
  }

  render() {
    const { executeDragonStateChanges, getInitialData, state } = this.props;
    const { title, _id, link, summary } = this.props.project;
    // map the subject data to the subject order array:
    const subjects = state.subjectOrder
      .map(subject => ({ ...state.subjects[subject] }));

    return (
      <Page
        addSubjectToOrder={this.addSubjectToOrder}
        authenticated={this.props.authenticated}
        clearAllTopics={this.clearAllTopics}
        create={state.create}
        dragons={state.dragons}
        editorOn={state.editorOn}
        logout={this.props.logout}
        projectId={_id}
        storyboardOn={state.storyboardOn}
        subjects={subjects}
        subtitle={summary}
        title={`Project: ${title}`}
        toggleDragonText={this.toggleDragonText}
        toggleSingleNewEditor={this.toggleSingleNewEditor}
        toggleStoryboard={this.toggleStoryboard}
        toggleSubject={this.toggleSubject}
        toggleSubjectForm={this.toggleSubjectForm}
        user={this.props.user}
      >

        {state.editorOn &&
          <EditorContainer>
            <EditorLogic
              executeDragonStateChanges={executeDragonStateChanges}
              callback={this.toggleSingleNewEditor}
              projectId={_id}
              state={state}
            >
              {editorProps => (
                <SingleNewEditor
                  {...editorProps}
                  subjects={subjects}
                  toggleSingleNewEditor={this.toggleSingleNewEditor}
                />
              )}
            </EditorLogic>
          </EditorContainer>
        }

        {state.inlineTextNew &&
          <EditorLogic
            callback={this.toggleInlineNew}
            executeDragonStateChanges={executeDragonStateChanges}
            projectId={_id}
            subject={state.singleSubject}
            state={state}
          >
            {editorProps => (
              <InlineNewEditor
                {...editorProps}
                texts={state.singleSubject.textIds.map(textId => state.texts[textId])}
                toggleInlineNew={this.toggleInlineNew}
              />
            )}
          </EditorLogic>
        }

        {state.singleTextEdit &&
          <EditorLogic
            callback={this.toggleSingleEdit}
            executeDragonStateChanges={executeDragonStateChanges}
            state={state}
            subject={state.singleSubject}
            text={JSON.parse(state.singleText.text)}
            title={state.singleText.title}
            thesis={state.singleText.thesis}
          >
            {editorProps => (
              <SingleUpdateEditor
                {...editorProps}
                storyboardOn={state.storyboardOn}
                text={state.singleText}
                texts={state.singleSubject.textIds.map(textId => state.texts[textId])}
                toggleSingleEdit={this.toggleSingleEdit}
              />
            )}
          </EditorLogic>
        }

        {state.dropZoneOn
          && (state.dragons
            ? (
              <MainDropZone>
                <ModalLogic>
                  {modalProps => (
                    <DragonFullTextColumn
                      {...modalProps}
                      addImageToText={this.addImageToText}
                      deleteText={this.deleteText}
                      executeDragonStateChanges={executeDragonStateChanges}
                      getInitialData={getInitialData}
                      incomingSubject={state.incomingSubject}
                      incomingText={state.incomingText}
                      projectLink={link}
                      state={state}
                      subject={state.subjects[state.singleSubjectId]}
                      subjects={subjects}
                      texts={state.subjects[state.singleSubjectId].textIds
                        .map(textId => (state.texts[textId]))}
                      toggleDragonText={this.toggleDragonText}
                      toggleStoryboard={this.toggleStoryboard}
                      user={this.props.user}
                    />
                  )}
                </ModalLogic>
              </MainDropZone>
            ) : state.storyboardOn
              ? (
                <StoryboardContainer>
                  <ImageUploader
                    addImageToText={this.addImageToText}
                    addImageToSubject={this.addImageToSubject}
                    type="text"
                  >
                    {provided => (
                      <Storyboard
                        {...provided}
                        deleteText={this.deleteText}
                        executeDragonStateChanges={executeDragonStateChanges}
                        projectLink={link}
                        state={state}
                        subject={state.subjects[state.singleSubjectId]}
                        subjects={subjects}
                        texts={state.subjects[state.singleSubjectId].textIds
                          .map(textId => (state.texts[textId]))}
                        toggleDragonText={this.toggleDragonText}
                        toggleSingleEdit={this.toggleSingleEdit}
                        toggleStoryboard={this.toggleStoryboard}
                      />
                    )}
                  </ImageUploader>
                </StoryboardContainer>

              ) : (state.texts &&
                <MainDropZone>

                  {subjects.length === 0
                    ? (
                      <EmptyProjectText>
                        <h2>This project is currently empty</h2>
                        <h3>Click the 'New Column' button to the left to get started</h3>
                      </EmptyProjectText>
                    ) : (

                      <ImageUploader
                        getInitialData={getInitialData}
                        addImageToSubject={this.addImageToSubject}
                        type="subject"
                      >
                        {provided => (
                          state.subjectOrder.map((subjectId, index) => {
                            const subject = state.subjects[subjectId];
                            const texts = subject.textIds.map(textId => state.texts[textId]);
                            return state[subject._id] &&
                              <DragonColumn
                                {...provided}
                                addImageToText={this.addImageToText}
                                deleteText={this.deleteText}
                                executeDragonStateChanges={executeDragonStateChanges}
                                getInitialData={getInitialData}
                                index={index}
                                key={subject._id}
                                state={state}
                                subject={subject}
                                texts={texts}
                                toggleDragonText={this.toggleDragonText}
                                toggleInlineNew={this.toggleInlineNew}
                                toggleSingleEdit={this.toggleSingleEdit}
                                toggleStoryboard={this.toggleStoryboard}
                                toggleSubject={this.toggleSubject}
                                user={this.props.user}
                              />
                          })
                        )}
                      </ImageUploader>
                    )}

                </MainDropZone>
              )
          )}
      </Page>
    );
  }
}

export default Project;