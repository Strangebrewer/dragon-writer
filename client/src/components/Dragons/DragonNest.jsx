import React, { PureComponent, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ImageUploader } from "../PageElements";
import { Button, Input, Label } from "../Forms/FormElements";
import { DragonEgg } from "./DragonEgg";
import { ColumnButtons } from "./DragonElements";
import { API, Scales } from '../../utils';

const Container = styled.div`
  background: #ffffff22;
  display: flex;
  flex-direction: column;
  margin: 10px;
  min-width: 260px;
  position: relative;
  width: 300px;
`;

const SubjectHeader = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
`;

const DragonList = styled.div`
  box-shadow: ${props => (
    props.isDraggingOver
      ? '0 0 15px #26d4cc, 0 0 10px #26d4cc, 0 0 5px #26d4cc, 0 0 2px #26d4cc, inset 0 0 10px 0 #26d4cc'
      : "none"
  )};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 8px;
  padding-top: 136px;
  transition: all .2s ease-in-out;
`;

const Heading3 = styled.div`
  font-family: ${props => props.theme.hTypeface};
  font-size: 2.4rem;
  margin: 5px 0 8px 0;
  padding: 0 8px;
  text-align: center;
  text-shadow: 2px 2px 2px #000;
`;

const Paragraph = styled.p`
  border-top: 1px solid ${props => props.theme.mainColor};
  color: ${props => props.theme.mainColor};
  font-size: 1.3rem;
  margin: 0 10px;
  min-height: 75px;
  padding: 8px;
  text-align: center;
`;

export class DragonNest extends PureComponent {
  state = {
    redirectToPrint: false,
    subject: '',
    subjectId: '',
    theme: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  updateSubjectModal = subject => {
    this.props.setModal({
      body: (
        <Fragment>
          <Label>Column Subject:</Label>
          <Input
            type="text"
            name="subject"
            onChange={this.handleInputChange}
            placeholder={subject.subject}
          />
          <Label>Column Theme:</Label>
          <Input
            type="text"
            name="theme"
            onChange={this.handleInputChange}
            placeholder={subject.theme}
          />
        </Fragment>
      ),
      buttons: (
        <Fragment>
          <Button onClick={() => this.updateSubject(
            subject._id,
            {
              subject: this.state.subject || subject.subject,
              theme: this.state.theme || subject.theme
            }
          )}>Submit</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Fragment>
      )
    })
  };

  updateSubject = async (id, updateObject) => {
    this.props.closeModal();
    const newState = Scales.updateSubjectHelper(id, updateObject, this.props.state);
    API.updateSubject(id, updateObject);
    this.props.executeDragonStateChanges(newState);
  };

  deleteSubjectModal = (id, index) => {
    this.props.setModal({
      body: <h2>Are you sure you want to delete this column? You will lose all texts contained inside it.</h2>,
      buttons: (
        <Fragment>
          <Button onClick={() => this.deleteSubject(id, index)}>
            Yes, delete it
          </Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Fragment>
      )
    })
  };

  deleteSubject = async (id, index) => {
    const newState = Scales.deleteSubjectHelper(id, index, this.props.state);
    await API.deleteSubject(id);
    this.props.executeDragonStateChanges(newState);
    this.props.closeModal();
  };

  togglePrintMode = subjectId => {
    this.setState({
      redirectToPrint: !this.state.redirectToPrint,
      subjectId
    })
  };

  render() {
    if (this.state.redirectToPrint)
      return <Redirect to={{
        pathname: "/print",
        state: {
          texts: this.props.texts,
          subject: this.props.subject
        }
      }} target="_blank" />
    const {
      addImageToText,
      deleteText,
      getInitialData,
      imageModal,
      index,
      loading,
      subject,
      texts,
      toggleDragonText,
      toggleInlineNew,
      toggleSingleEdit,
      toggleStoryboard,
      toggleSubject,
      uploadImageModal,
    } = this.props;
    console.log(texts);
    const { theme, _id } = subject;
    return (
      <Fragment>
        <Draggable draggableId={_id} index={index}>
          {provided => (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <ColumnButtons
                uploadImageModal={uploadImageModal}
                loading={loading}
                imageModal={imageModal}
                subject={subject}
                id={_id}
                index={index}
                updateSubjectModal={this.updateSubjectModal}
                deleteSubjectModal={this.deleteSubjectModal}
                texts={texts}
                toggleDragonText={toggleDragonText}
                toggleInlineNew={toggleInlineNew}
                togglePrintMode={this.togglePrintMode}
                toggleStoryboard={toggleStoryboard}
                toggleSubject={toggleSubject}
              />

              <SubjectHeader {...provided.dragHandleProps}>
                <Heading3>{subject.subject}</Heading3>
                <Paragraph>{theme}</Paragraph>
              </SubjectHeader>

              <Droppable droppableId={_id} type="text">
                {(provided, snapshot) => (
                  <DragonList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}  
                  >
                    <ImageUploader
                      addImageToText={addImageToText}
                      getInitialData={getInitialData}
                      type="text"
                    >
                      {provided => (
                        texts.map((text, index) => {
                          return (
                            <DragonEgg
                              {...provided}
                              deleteText={deleteText}
                              index={index}
                              key={text._id}
                              subject={subject}
                              text={text}
                              toggleSingleEdit={toggleSingleEdit}
                            />
                          )
                        })
                      )}
                    </ImageUploader>
                    {provided.placeholder}
                  </DragonList>
                )}
              </Droppable>
            </Container>
          )}
        </Draggable>
      </Fragment>
    )
  }
};