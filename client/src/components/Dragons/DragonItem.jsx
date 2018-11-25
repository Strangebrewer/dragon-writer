import React, { Component, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import dateFns from "date-fns";
import Modal from "../Elements/Modal";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 5px;
  padding: 6px 8px 4px 8px;
  transition: background-color .2s ease-in-out;
  box-shadow: ${props => props.theme.formShine};
  opacity: ${props => (
    props.dragging || props.loading
      ? "0.9"
      : "1"
  )};
  background-color: ${props => (
    props.isDragging
      ? props.theme.link
      : props.theme.color
  )};
  h4 {
    font-size: 1.8rem;
    font-weight: bold;
    padding-bottom: 2px;
    color: ${props => props.theme.black};
  }
  p {
    font-size: 1.5rem;
    padding-left: 12px;
    color: ${props => props.theme.bg};
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  z-index: 999;
  top: 4px;
  right: 2px;
  color: ${props => props.theme.bg};
  font-size: .9rem;
  outline: transparent;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  &:hover, &:focus {
    color: ${props => props.theme.blood};
    cursor: pointer;
  }
`;

const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateText = styled.h5`
    display: inline-block;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 8px;
    color: ${props => props.theme.black};
`;

class DragonItem extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
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

  deleteTextModal = (textId, subjectId, index) => {
    this.setModal({
      body: <p>Are you sure you want to delete? This is permenent.</p>,
      buttons: (
        <React.Fragment>
          <button onClick={() => this.props.deleteText(textId, subjectId, index)}>Yes, delete it</button>
          <button onClick={this.closeModal}>Cancel</button>
        </React.Fragment>
      )
    })
  };

  render() {
    const { index, text, subjectId } = this.props;
    return (
      <Fragment>
        <Modal
          show={this.state.modal.isOpen}
          closeModal={this.closeModal}
          body={this.state.modal.body}
          buttons={this.state.modal.buttons}
          outsideClick={this.outsideClick}
        />
        <Draggable
          draggableId={text._id}
          index={index}
          isDragDisabled={this.props.loading}
        >
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              loading={this.props.loading}
              dragging={this.props.dragging}
            >
              <DeleteBtn onClick={() => this.deleteTextModal(text._id, subjectId, index)}>
                delete
            </DeleteBtn>

              <h4>{text.title}</h4>
              <p {...provided.dragHandleProps}>{text.thesis}</p>

              <DateDiv>
                <DateText>
                  created: {dateFns.format(text.createdAt, "MMM DD, YYYY")}
                </DateText>

                <DateText>
                  modified: {dateFns.format(text.updatedAt, "MMM DD, YYYY")}
                </DateText>
              </DateDiv>
            </Container>
          )}
        </Draggable>
      </Fragment>

    );
  }
}

export default DragonItem;