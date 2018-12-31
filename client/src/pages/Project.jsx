import React, { PureComponent, Fragment } from 'react';
import styled from "styled-components";
import { ImageUploader, Page } from "../components/PageElements"
import { EditorLogic, ModalLogic } from "../components/Renderers";
import { InlineNewEditor, SingleNewEditor, SingleUpdateEditor } from "../components/slate/Editors";
import { Storyboard } from "../components/Storyboard";
import { DragonNest, DragonTextNest } from "../components/Dragons";
import { DragonLair } from "../components/Dragons/DragonElements";
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

class Project extends PureComponent {

  componentDidMount() {
    // if there is no saved order, then this will load the first three columns
    if (!this.props.project.order && this.props.project.subjects.length) {
      const { subjects } = this.props.project;
      const stateObj = {};
      for (let i = 0; i < 3; i++) {
        stateObj[subjects[i]._id] = true;
      }
      this.props.executeDragonStateChanges(stateObj);
    }
  };

  toggleSingleNewEditor = () => {
    const { editorOn, dropZoneOn } = this.props.state;
    const newState = Toggle.singleNew(editorOn, dropZoneOn);
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

  addImageToOrder = newSubject => {
    const newState = Scales.addImageToOrder(newSubject, this.props.state);
    this.props.executeDragonStateChanges(newState);
  };

  addImageToText = text => {
    const newState = Scales.addImageToText(text, this.props.state);
    this.props.executeDragonStateChanges(newState);
  }

  render() {
    // console.log(this.props);
    const { executeDragonStateChanges, getInitialData, state } = this.props;
    const { title, _id, link, summary } = this.props.project;
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
        mode={this.props.mode}
        nextMode={this.props.nextMode}
        project
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
        toggleStyleMode={this.props.toggleStyleMode}
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
            projectId={this.props.project._id}
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

          </EditorLogic>}

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
                text={state.singleText}
                texts={state.singleSubject.textIds.map(textId => state.texts[textId])}
                toggleSingleEdit={this.toggleSingleEdit}
              />
            )}
          </EditorLogic>}

        {state.dropZoneOn
          && (state.dragons
            ? (
              <DragonLair>
                <ModalLogic>
                  {modalProps => (
                    <DragonTextNest
                      {...modalProps}
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

              </DragonLair>
            ) : state.storyboardOn
              ? (
                <StoryboardContainer>
                  <ImageUploader
                    addImageToText={this.addImageToText}
                    getInitialData={getInitialData}
                    addImageToOrder={this.addImageToOrder}
                  >
                    {provided => (
                      <Storyboard
                        {...provided}
                        deleteText={this.deleteText}
                        executeDragonStateChanges={executeDragonStateChanges}
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

              ) : (
                <DragonLair>
                  <ImageUploader
                    getInitialData={getInitialData}
                    addImageToOrder={this.addImageToOrder}
                    type="subject"
                  >
                    {provided => (
                      state.subjectOrder.map((subjectId, index) => {
                        const subject = state.subjects[subjectId];
                        const texts = subject.textIds.map(textId => state.texts[textId]);
                        return state[subject._id] &&
                          <DragonNest
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
                </DragonLair>
              )
          )}
      </Page>
    );
  }
}

export default Project;