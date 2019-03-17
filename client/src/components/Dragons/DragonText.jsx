import React, { Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { renderMark, renderNode } from "../slate/utils/Renderers";
import { ItemButtons } from "./DragonElements";
import { Button } from "../Forms/FormElements";

const TextContainer = styled.div`
  background: ${props => (
    props.published
      ? props.isDragging ? "rgba(255, 255, 255, 0.36)" : "rgba(255, 255, 255, 0.25)"
      : props.isDragging ? "rgba(22, 136, 130, 0.55)" : "rgba(22, 136, 130, 0.287)"
  )};
  border-left: 1px solid ${props => (
    props.published ? "rgba(255, 255, 255, 0.183)" : "rgb(18, 110, 106)"
  )};
  border-top: 1px solid ${props => (
    props.published ? "rgba(255, 255, 255, 0.533)" : "rgb(22, 136, 130)"
  )};
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgb(0,0,0);
  color: rgb(255,255,255);
  margin-bottom: 8px;
  opacity: ${props => props.loading ? "0.9" : "1"};
  padding: 20px;
  position: relative;
  transition: background-color .2s ease-in-out;
  width: 100%;
  &:hover {
    background: ${props => (
    props.published ? "rgba(255, 255, 255, 0.36)" : "rgba(22, 136, 130, 0.55)"
  )};
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
  max-height: 55vh;
  overflow: auto;
  padding: 30px 50px;
  text-shadow: none;
  p {
    text-indent: 25px;
  }
`;

export const DragonText = React.memo(props => {

  const deleteText = (textId, subjectId, index) => {
    props.closeModal();
    props.deleteText(textId, subjectId, index);
  }

  const deleteTextModal = (textId, subjectId, index) => {
    props.setModal({
      body: <p>Are you sure you want to delete this text? This is permenent.</p>,
      buttons: (
        <div>
          <Button onClick={() => deleteText(textId, subjectId, index)}>
            Yes, delete it
          </Button>
          <Button onClick={props.closeModal}>
            Cancel
          </Button>
        </div>
      )
    })
  };

  const seeFullText = text => {
    const { index, subject, toggleSingleEdit } = props;
    props.setModal({
      body: (
        <Fragment>
          <ModalH2>{text.title}</ModalH2>
          <ModalH3>{text.thesis}</ModalH3>
          <EditorStyle>
            <Editor
              value={Value.fromJSON(JSON.parse(text.text))}
              renderMark={renderMark}
              renderNode={renderNode}
              schema={props.schema}
            />
          </EditorStyle>
        </Fragment>
      ),
      buttons: (
        <div>
          <Button onClick={props.closeModal}>
            Close
          </Button>
          <Button onClick={() => toggleSingleEdit(subject, text)}>
            Edit
          </Button>
          <Button onClick={() => deleteTextModal(text._id, subject._id, index)}>
            Delete
          </Button>
        </div>
      ),
      style: { maxHeight: '80vh', overflow: 'auto' }
    });
  }

  const { disabled, index, subject, text } = props;
  return (
    <Fragment>
      <Draggable
        draggableId={text._id}
        index={index}
        isDragDisabled={props.loading}
      >
        {(provided, snapshot) => (
          <TextContainer
            {...provided.draggableProps}
            ref={provided.innerRef}
            published={subject.published}
            isDragging={snapshot.isDragging}
            loading={props.loading}
            {...provided.dragHandleProps}
          >
            <ItemButtons
              deleteTextModal={deleteTextModal}
              disabled={disabled}
              imageModal={props.imageModal}
              id={text._id}
              index={index}
              loading={props.loading}
              seeFullText={seeFullText}
              subject={subject}
              text={text}
              toggleSingleEdit={props.toggleSingleEdit}
              uploadImageModal={props.uploadImageModal}
            />

            <h4>{text.title}</h4>
            <p>{text.thesis}</p>
          </TextContainer>
        )}
      </Draggable>
    </Fragment>
  );
});

export {
  TextContainer
}