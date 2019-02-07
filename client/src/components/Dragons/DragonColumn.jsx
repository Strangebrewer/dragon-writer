import React, { PureComponent, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ImageUploader } from "../PageElements";
import { Button, Input, Label } from "../Forms/FormElements";
import { DragonText } from "./DragonText";
import { ColumnButtons } from "./DragonElements";
import { API, Scales } from '../../utils';

const Container = styled.div`
  background: ${props => props.isDragging
    ? "rgba(255, 255, 255, 0.183)"
    : "rgba(255, 255, 255, 0.133)"};
  border-left: 1px solid rgb(255, 255, 255, 0.183);
  border-top: 1px solid rgb(255, 255, 255, 0.533);
  box-shadow: 4px 4px 4px rgb(0,0,0);
  display: flex;
  flex-direction: column;
  margin: 10px;
  min-width: 260px;
  position: relative;
  text-shadow: 2px 2px 2px rgb(0,0,0);
  width: 300px;
`;

const SubjectHeader = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
  h3 {
    font-family: ${props => props.theme.hTypeface};
    font-size: 2.4rem;
    margin: 5px 0 8px 0;
    overflow: hidden;
    padding: 0 8px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 300px;
  }
  p {
    border-top: 1px solid ${props => props.theme.mainColor};
    color: ${props => props.theme.mainColor};
    font-size: 1.3rem;
    margin: 0 10px;
    min-height: 75px;
    padding: 8px;
    text-align: center;
  }
`;

const DragonList = styled.div`
  box-shadow: ${props => props.isDraggingOver
    ? `0 0 5px rgb(38, 212, 204),
      0 0 2px rgb(38, 212, 204),
      inset 0 0 20px 0 rgb(39, 212, 204)`
    : "none"};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 8px;
  padding-top: 136px;
  transition: box-shadow .2s ease-in-out;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export class DragonColumn extends PureComponent {
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
        <form>
          <Label>Column Topic:</Label>
          <Input
            type="text"
            name="subject"
            maxLength="22"
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
          <ButtonContainer>
            <Button onClick={e => this.updateSubject(
              e,
              subject._id,
              {
                subject: this.state.subject || subject.subject,
                theme: this.state.theme || subject.theme
              }
            )}>Submit</Button>
            <Button onClick={this.props.closeModal}>Cancel</Button>
          </ButtonContainer>
        </form>
      )
    });
  };

  updateSubject = async (e, id, updateObject) => {
    e.preventDefault();
    this.props.closeModal();
    const newState = Scales.updateSubjectHelper(id, updateObject, this.props.state);
    API.updateSubject(id, updateObject);
    this.props.executeDragonStateChanges(newState);
  };

  deleteSubjectModal = (id, index) => {
    this.props.setModal({
      body: (
        <Fragment>
          <h2>Are you sure you want to delete this column?</h2>
          <h2>You will lose all texts contained inside it.</h2>
        </Fragment>
      ),
      buttons: (
        <div>
          <Button onClick={() => this.deleteSubject(id, index)}>
            Yes, delete it
          </Button>
          <Button onClick={this.props.closeModal}>
            Cancel
          </Button>
        </div>
      ),
      style: { maxWidth: "500px", textAlign: "center" }
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
      }} target="_blank" rel="noopener noreferrer" />
    const {
      addImageToText,
      deleteText,
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
    const { _id, theme } = subject;
    return (
      <Fragment>
        <Draggable draggableId={_id} index={index}>
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <ColumnButtons
                deleteSubjectModal={this.deleteSubjectModal}
                id={_id}
                imageModal={imageModal}
                index={index}
                loading={loading}
                subject={subject}
                texts={texts}
                toggleDragonText={toggleDragonText}
                toggleInlineNew={toggleInlineNew}
                togglePrintMode={this.togglePrintMode}
                toggleStoryboard={toggleStoryboard}
                toggleSubject={toggleSubject}
                updateSubjectModal={this.updateSubjectModal}
                uploadImageModal={uploadImageModal}
              />

              <SubjectHeader {...provided.dragHandleProps}>
                <h3>{subject.subject}</h3>
                <p>{theme}</p>
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
                      type="text"
                    >
                      {provided => (
                        texts.map((text, index) => {
                          return (
                            <DragonText
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