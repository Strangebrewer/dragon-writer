import React, { Component, Fragment } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { LinkBtn, Modal } from "../Elements";
import { Button, Input, Label } from "../Forms/FormElements";
import { DragonItem } from "./DragonItem";
import { API } from '../../utils';

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

const CRUDButtons = styled.div`
  position: absolute;
  top: 6px;
  left: 8px;
  display: flex;
  justify-content: space-between;
`;

export class DragonColumn extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    subject: '',
    theme: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  closeModal = () => {
    this.setState({
      modal: { isOpen: false }
    });
  };

  setModal = modalInput => {
    this.setState({
      modal: {
        isOpen: true,
        body: modalInput.body,
        buttons: modalInput.buttons
      }
    });
  };

  outsideClick = event => {
    // the space in this is necessary because the outer div is the only one that will have a space after 'modal' in the classname.
    if (event.target.className.includes("modal "))
      this.closeModal();
  };

  updateSubjectModal = subject => {
    this.setModal({
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
          <Button onClick={() => this.props.updateSubject(
            subject._id,
            {
              subject: this.state.subject || subject.subject,
              theme: this.state.theme || subject.theme
            }
          )}>Submit</Button>
          <Button onClick={this.closeModal}>Cancel</Button>
        </Fragment>
      )
    })
  };

  deleteSubjectModal = (id, index) => {
    this.setModal({
      body: <h2>Are you sure you want to delete this column? You will lose all texts contained inside it.</h2>,
      buttons: (
        <Fragment>
          <Button onClick={() => this.props.deleteSubject(id, index)}>
            Yes, delete it
          </Button>
          <Button onClick={this.closeModal}>Cancel</Button>
        </Fragment>
      )
    })
  };

  render() {
    const {
      deleteText,
      dragging,
      dragonTextOn,
      index,
      loading,
      subject,
      texts,
      toggleEditor,
      toggleSubject,
      updateSubject
    } = this.props;
    const { theme, _id } = subject;
    return (
      <Draggable draggableId={_id} index={index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Modal
              show={this.state.modal.isOpen}
              closeModal={this.closeModal}
              body={this.state.modal.body}
              buttons={this.state.modal.buttons}
              outsideClick={this.outsideClick}
            />
            <CRUDButtons>
              <LinkBtn
                title={`create new item for ${subject.subject} column`}
                padding="0 3px 5px 3px"
                onClick={() => this.props.toggleEditor(subject)}
              >
                <i className="far fa-file-alt"></i>
              </LinkBtn>

              <LinkBtn
                title="expand column to read all full texts"
                padding="0 3px 5px 3px"
                onClick={() => dragonTextOn(_id)}
              >
                <i className="far fa-eye"></i>
              </LinkBtn>

              <LinkBtn
                title="update column name"
                padding="0 3px 5px 3px"
                onClick={() => this.updateSubjectModal(subject)}
              >
                <i className="fas fa-edit"></i>
              </LinkBtn>

              <LinkBtn
                title="delete this column"
                padding="0 3px 5px 3px"
                delete
                onClick={() => this.deleteSubjectModal(_id, index)}
              >
                <i className="fas fa-trash-alt"></i>
              </LinkBtn>
            </CRUDButtons>

            <LinkBtn
              title="close this column"
              position="absolute"
              top="2px"
              right="3px"
              padding="0 4px 5px 0"
              size="2rem"
              onClick={() => toggleSubject(_id)}
            >
              &times;
           </LinkBtn>

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
                  {texts.map((text, index) => (
                    <DragonItem
                      key={text._id}
                      index={index}
                      text={text}
                      subject={subject}
                      deleteText={deleteText}
                      loading={loading}
                      dragging={dragging}
                      toggleEditor={toggleEditor}
                    />
                  ))}
                  {provided.placeholder}
                </DragonList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    )
  }
};