import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { EditorLogic } from "../Renderers";
import { InlineUpdateEditor } from "../slate/Editors";

const Container = styled.div`
  width: 100%;
  max-width: 1450px;
  display: flex;
  height: 100%;
  position: relative;
  transition: background-color .2s ease-in-out;
  background: ${props => (
    props.isDragging
      ? props.theme.pageBGLite
      : props.theme.inlineEditorBG
  )};
  padding-right: 200px;
`;

const ImageContainer = styled.div`
  align-self: flex-start;
  background: ${props => (
    props.isDragging
      ? props.theme.pageBGLite
      : props.theme.inlineEditorBG
  )};
  display: flex;
  height: 100%;
  margin: auto 10px auto 0;
  padding-top: 40px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  position: absolute;
  bottom: 0;
  right: -200px;
  top: 0;
  width: 390px;
  img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;

const Banner = styled.div`
  height: 30px;
  background: ${props => props.theme.bannerBG};
  width: 390px;
  position: absolute;
  top: 0;
  right: 0;
`;

export class DragonTextEditable extends Component {

  fullSizeImageModal = (imageUrl) => {
    this.props.setModal({
      body: <img src={imageUrl} alt="" style={{ maxWidth: '100%', maxHeight: '75vh' }} />,
      buttons: <button onClick={this.props.closeModal}>Close</button>
    })
  };

  render() {
    const {
      text,
      executeDragonStateChanges,
      index,
      toggleEditable,
    } = this.props;
    return (
      <Draggable key={text._id} draggableId={text._id} index={index}>
        {(provided, snapshot) => (
          <Container
            key={text._id}
            index={index}
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <EditorLogic
              callback={toggleEditable}
              executeDragonStateChanges={executeDragonStateChanges}
              incomingText={text}
              state={this.props.state}
              subject={text.subjectId}
              text={JSON.parse(text.text)}
              thesis={text.thesis}
              title={text.title}
            >
              {editorProps => (
                <InlineUpdateEditor
                  {...editorProps}
                  dragHandle={provided.dragHandleProps}
                  id={text._id}
                  inline="true"
                  isDragging={snapshot.isDragging}
                  title={text.title}
                  toggleEditable={toggleEditable}
                />
              )}
            </EditorLogic>

            <ImageContainer>
              <Banner />
              <img src={text.image} alt="" onClick={() => this.fullSizeImageModal(text.largeImage)} />
            </ImageContainer>

          </Container>
        )}
      </Draggable>
    );
  }
};