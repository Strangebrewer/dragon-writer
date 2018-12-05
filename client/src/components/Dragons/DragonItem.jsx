import React, { Component, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { renderMark, renderNode } from "../Slate/utils/Renderers";
import { DateDiv, ItemButtons } from "./DragonElements";
import { Modal } from "../PageElements";
import { Button } from "../Forms/FormElements";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 5px;
  padding: 6px 8px 4px 8px;
  transition: background-color .2s ease-in-out;
  box-shadow: ${props => props.theme.fieldShine};
  opacity: ${props => (
    props.dragging || props.loading
      ? "0.9"
      : "1"
  )};
  background: ${props => (
    props.isDragging
      ? props.theme.itemDragBG
      : props.theme.itemBG
  )};
  color: ${props => props.theme.itemColor};
  h4 {
    font-size: 1.8rem;
    font-weight: bold;
    padding-bottom: 2px;
  }
  p {
    font-size: 1.5rem;
    padding-left: 12px;
  }
`;

const ModalH2 = styled.h2`
  font-family: ${props => props.theme.hTypeface};
  font-size: 3.5rem;
`;

const ModalH3 = styled.h3`
  font-size: 2rem;
  margin-bottom: 10px;
  margin-top: 4px;
  text-indent: 30px;
`;

const editorStyle = {
  padding: "20px",
  border: "1px solid black",
  overflow: "auto",
  maxHeight: "300px",
}

export class DragonItem extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: "",
      style: {}
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
        buttons: modalInput.buttons,
        style: modalInput.style
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

  seeFullText = text => {
    console.log(text);
    this.setModal({
      body: (
        <Fragment>
          <ModalH2>{text.title}</ModalH2>
          <ModalH3>{text.thesis}</ModalH3>
          <Editor
            value={Value.fromJSON(JSON.parse(text.text))}
            renderMark={renderMark}
            renderNode={renderNode}
            style={editorStyle}
          />
        </Fragment>
      ),
      buttons: (
        <Button onClick={this.closeModal}>Close</Button>
      ),
      style: { maxHeight: '80vh', overflow: 'auto' }
    })
  }

  render() {
    const { index, text, subject } = this.props;
    return (
      <Fragment>
        <Modal
          style={this.state.modal.style}
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
              {...provided.dragHandleProps}
            >
              <ItemButtons
                deleteTextModal={this.deleteTextModal}
                index={index}
                seeFullText={this.seeFullText}
                subject={subject}
                text={text}
                toggleSingleEdit={this.props.toggleSingleEdit}
              />

              <h4>{text.title}</h4>
              <p>{text.thesis}</p>

              <DateDiv text={text}/>

            </Container>
          )}
        </Draggable>
      </Fragment>

    );
  }
};