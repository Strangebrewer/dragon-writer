import React, { PureComponent, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { renderMark, renderNode } from "../slate/utils/Renderers";
import { ItemButtons } from "./DragonElements";
import { Button } from "../Forms/FormElements";

const Container = styled.div`
  background: #16888256;
  border-radius: 5px;
  box-shadow: 2px 2px 4px #000;
  color: #fff;
  margin-bottom: 8px;
  opacity: ${props => (
    props.isDragging || props.loading
      ? "0.9"
      : "1"
  )};
  padding: 20px;
  position: relative;
  transition: background-color .2s ease-in-out;
  width: 100%;
  h4 {
    font-family: ${props => props.theme.hTypeface};
    font-size: 1.75rem;
    padding-bottom: 4px;
  }
  p {
    font-size: 1.25rem;
    line-height: 1.2;
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
  border: "1px solid black",
  maxHeight: "300px",
  overflow: "auto",
  padding: "20px",
}

export class DragonEgg extends PureComponent {

  deleteText = (textId, subjectId, index) => {
    this.props.closeModal();
    this.props.deleteText(textId, subjectId, index);
  }

  deleteTextModal = (textId, subjectId, index) => {
    this.props.setModal({
      body: <p>Are you sure you want to delete? This is permenent.</p>,
      buttons: (
        <React.Fragment>
          <button onClick={() => this.deleteText(textId, subjectId, index)}>Yes, delete it</button>
          <button onClick={this.props.closeModal}>Cancel</button>
        </React.Fragment>
      )
    })
  };

  seeFullText = text => {
    this.props.setModal({
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
        <Button onClick={this.props.closeModal}>Close</Button>
      ),
      style: { maxHeight: '80vh', overflow: 'auto' }
    })
  }

  render() {
    const { disabled, index, text, subject } = this.props;
    return (
      <Fragment>
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
              {...provided.dragHandleProps}
            >
              <ItemButtons
                deleteTextModal={this.deleteTextModal}
                disabled={disabled}
                imageModal={this.props.imageModal}
                id={text._id}
                index={index}
                loading={this.props.loading}
                seeFullText={this.seeFullText}
                subject={subject}
                text={text}
                toggleSingleEdit={this.props.toggleSingleEdit}
                uploadImageModal={this.props.uploadImageModal}
              />

              <h4>{text.title}</h4>
              <p>{text.thesis}</p>
            </Container>
          )}
        </Draggable>
      </Fragment>

    );
  }
};