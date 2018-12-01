import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { renderMark, renderNode } from "../slate/utils/Renderers";
import { EditorStyles } from "../slate/utils/EditorStyles";
import { Modal, LinkBtn } from "../PageElements";
import initialValue from "../slate/utils/value.json"

const Container = styled.div`
  width: 100%;
  display: flex;
  border-radius: 10px;
  background: ${props => (
    props.isDragging
      ? props.theme.pageBGLite
      : 'transparent'
  )};
  transition: background-color 0.2s ease-in-out, border 0.2s ease-in-out;
`;

const MetaDataContainer = styled.div`
  min-width: 160px;
  max-width: 160px;
  text-align: right;
  padding-right: 30px;
  padding-top: 10px;
`;

const TextTitle = styled.h3`
  font-size: 1.8rem;
  line-height: 1;
  font-weight: bold;
  margin: 0;
`;

const TextThesis = styled.p`
  line-height: 1;
  font-size: 1.5rem;
  margin: 0;
  padding: 4px 0 6px 0;
`;

export class DragonTextItem extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
  }

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
    const { index, text, subject, toggleEdit, toggleEditable, toggleEditor } = this.props;
    const thisValue = text.text ? JSON.parse(text.text) : initialValue;
    text.parentSubject = subject;
    console.log(text);
    return (
      <React.Fragment>
        <Modal
          show={this.state.modal.isOpen}
          closeModal={this.closeModal}
          body={this.state.modal.body}
          buttons={this.state.modal.buttons}
          outsideClick={this.outsideClick}
        />
        <Draggable key={text} draggableId={text._id} index={index}>
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
            >
              <MetaDataContainer>
                <TextTitle>{text.title}</TextTitle>
                <TextThesis>{text.thesis}</TextThesis>
                <LinkBtn
                  underline
                  padding="2px 0 10px 8px"
                  onClick={() => toggleEditable(text._id)}>edit</LinkBtn>
                <LinkBtn
                  underline
                  padding="2px 0 10px 8px"
                  delete
                  onClick={() => this.deleteTextModal(text._id, subject._id, index)}>delete</LinkBtn>
              </MetaDataContainer>

              <EditorStyles mode="read" isDragging={snapshot.isDragging}>
                <Editor
                  key={text._id}
                  index={index}
                  value={Value.fromJSON(thisValue)}
                  readOnly
                  renderMark={renderMark}
                  renderNode={renderNode}
                />
              </EditorStyles>
            </Container>
          )}

        </Draggable>
      </React.Fragment>

    );
  }
};