import React, { PureComponent, Fragment } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ModalLogic } from "../Renderers";
import { Button, Input, Label } from "../Forms/FormElements";
import { DragonEgg } from ".";
import { ColumnButtons } from "./DragonElements";
import { API, Scales } from '../../utils';

const Container = styled.div`
  position: relative;
  width: 260px;
  min-width: 260px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.pageBGLite};
`;

const SubjectHeader = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
`;

const DragonList = styled.div`
  padding: 8px;
  padding-top: 136px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 5px;
  transition: all .2s ease-in-out;
  border-color: ${props => (
    props.isDraggingOver
      ? props.theme.columnDragBorder
      : props.theme.links
  )};
  border-width: 2px;
  border-style: solid;
  box-shadow: ${props => (
    props.isDraggingOver
      ? props.theme.columnBS
      : "none"
  )};
`;

const Heading3 = styled.div`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  padding: 0 8px;
  margin: 5px 0 10px 0;
`;

const Paragraph = styled.p`
  margin: 0 10px;
  font-size: 1.5rem;
  padding: 8px;
  border-top: 1px solid ${props => props.theme.mainColor};
  min-height: 75px;
  color: ${props => props.theme.mainColor};
  text-align: center;
`;

export class DragonNest extends PureComponent {
  state = {
    subject: '',
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
  };

  render() {
    const {
      deleteText,
      dragging,
      toggleDragonText,
      index,
      loading,
      subject,
      texts,
      toggleSubject,
    } = this.props;
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
                subject={subject}
                id={_id}
                index={index}
                updateSubjectModal={this.updateSubjectModal}
                deleteSubjectModal={this.deleteSubjectModal}
                toggleDragonText={toggleDragonText}
                toggleInlineNew={this.props.toggleInlineNew}
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
                    {texts.map((text, index) => {
                      return (
                        <ModalLogic>
                          {modalProps => (
                            <DragonEgg
                              {...modalProps}
                              deleteText={deleteText}
                              dragging={dragging}
                              index={index}
                              key={text._id}
                              loading={loading}
                              subject={subject}
                              text={text}
                              toggleSingleEdit={this.props.toggleSingleEdit}
                            />
                          )}
                        </ModalLogic>

                      )
                    })}
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