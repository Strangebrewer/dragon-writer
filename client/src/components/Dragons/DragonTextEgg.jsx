import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { renderMark, renderNode } from "../slate/utils/Renderers";
import { EditorStyles } from "../slate/utils/EditorStyles";
import { LinkBtn } from "../PageElements";
import initialValue from "../slate/utils/value.json"

const Container = styled.div`
  background: ${props => (
    props.isDragging
      ? props.theme.pageBGLite
      : 'transparent'
  )};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  min-height: 140px;
  position: relative;
  transition: background-color 0.2s ease-in-out, border 0.2s ease-in-out;
  /* the two below allow for the parent space to be large enough for
     when the editor is toggled */
  margin-left: 100px;
  width: calc(100% - 200px);
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

const ImageContainer = styled.div`
  background: ${props => (
    props.isDragging
      ? props.theme.pageBGLite
      : 'transparent'
  )};
  position: absolute;
  right: -160px;
  height: 100%;
  width: 160px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  padding: 5px 5px 5px 30px;
  img {
    align-self: center;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
  }
`;

export class DragonTextEgg extends Component {

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

  deleteText = (textId, subjectId, index) => {
    this.props.deleteText(textId, subjectId, index);
    this.props.closeModal();
  };

  fullSizeImageModal = (imageUrl) => {
    this.props.setModal({
      body: <img src={imageUrl} alt="" style={{ maxWidth: '100%', maxHeight: '75vh' }} />,
      buttons: <button onClick={this.props.closeModal}>Close</button>
    })
  };

  render() {
    const { index, text, subject, toggleEditable } = this.props;
    const thisValue = text.text ? JSON.parse(text.text) : initialValue;
    text.parentSubject = subject;
    return (
      <React.Fragment>
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
                  onClick={() => toggleEditable(text._id)}
                  title={`edit '${text.title}'`}
                >
                  edit
                </LinkBtn>
                <LinkBtn
                  underline
                  padding="2px 0 10px 8px"
                  delete
                  onClick={() => this.deleteTextModal(text._id, subject._id, index)}
                  title={`delete '${text.title}'`}
                >
                  delete
                </LinkBtn>
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

              <ImageContainer isDragging={snapshot.isDragging}>
                <img src={text.image} alt="" onClick={() => this.fullSizeImageModal(text.largeImage)} />
              </ImageContainer>
            </Container>
          )}

        </Draggable>
      </React.Fragment>

    );
  }
};