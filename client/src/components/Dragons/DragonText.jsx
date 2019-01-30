import React, { PureComponent, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { renderMark, renderNode } from "../slate/utils/Renderers";
import { ItemButtons } from "./DragonElements";
import { LinkBtn } from "../PageElements";

const Container = styled.div`
  background: ${props => props.isDragging
    ? "rgba(22, 136, 130, 0.487)"
    : "rgba(22, 136, 130, 0.337)"};
  border-left: 1px solid rgb(18, 110, 106);
  border-top: 1px solid rgb(22, 136, 130);
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgb(0,0,0);
  color: rgb(255,255,255);
  margin-bottom: 8px;
  opacity: ${props => (
    props.loading
      ? "0.9"
      : "1"
  )};
  padding: 20px;
  position: relative;
  transition: background-color .2s ease-in-out;
  width: 100%;
  &:hover {
    background: rgba(22, 136, 130, 0.487);
  }
  h4 {
    font-family: ${props => props.theme.hTypeface};
    font-size: 1.75rem;
    padding-bottom: 4px;
    word-wrap: break-word;
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
  text-align: center;
`;

const ModalH3 = styled.h3`
  font-size: 2rem;
  margin: 10px auto;
  max-width: 800px;
  text-align: center;
`;

const EditorStyle = styled.div`
  background: ${props => props.theme.editorBG};
  border: 2px solid ${props => props.theme.links};
  border-radius: 6px;
  box-shadow: ${props => props.theme.fieldShadow};
  color: ${props => props.theme.black};
  max-height: 300px;
  overflow: auto;
  padding: 30px 50px;
  text-shadow: none;
  p {
    text-indent: 25px;
  }
`;

export class DragonText extends PureComponent {

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
    const { index, subject, toggleSingleEdit } = this.props;
    this.props.setModal({
      body: (
        <Fragment>
          <ModalH2>{text.title}</ModalH2>
          <ModalH3>{text.thesis}</ModalH3>
          <EditorStyle>
            <Editor
              value={Value.fromJSON(JSON.parse(text.text))}
              renderMark={renderMark}
              renderNode={renderNode}
            />
          </EditorStyle>
        </Fragment>
      ),
      buttons: (
        <div>
          <LinkBtn
            onClick={this.props.closeModal}
            style={{ background: "transparent" }}
            title="close"
          >
            <i className="fas fa-times" />
          </LinkBtn>
          <LinkBtn
            onClick={() => toggleSingleEdit(subject, text)}
            style={{ background: "transparent" }}
            title="edit text"
          >
            <i className="fas fa-edit" />
          </LinkBtn>
          <LinkBtn
            delete
            onClick={() => this.deleteTextModal(text._id, subject._id, index)}
            style={{ background: "transparent" }}
            title="delete text"
          >
            <i className="far fa-trash-alt" />
          </LinkBtn>
        </div>

      ),
      style: { maxHeight: '80vh', overflow: 'auto' }
    });
  }

  render() {
    const { disabled, index, subject, text } = this.props;
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