import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { EditorLogic } from "../Renderers";
import { InlineUpdateEditor } from "../slate/Editors";

const Container = styled.div`
  background: ${props => (
    props.isDragging
      ? props.theme.pageBGLite
      : 'transparent'
  )};
  display: flex;
  transition: background-color .2s ease-in-out;
  width: 100%;
`;

const ImageContainer = styled.div`
  align-self: flex-start;
  background: ${props => (
    props.isDragging
      ? props.theme.pageBGLite
      : 'transparent'
  )};
  display: flex;
  height: 100%;
  min-width: 390px;
  padding-top: 10px;
  padding-right: 30px;
  padding-left: 20px;
  width: 390px;
  img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;

const Banner = styled.div`
  background: ${props => props.theme.bannerBG};
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  width: 390px;
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

            <ImageContainer isDragging={snapshot.isDragging}>
              {/* <Banner /> */}
              <img src={text.image} alt="" onClick={() => this.fullSizeImageModal(text.largeImage)} />
            </ImageContainer>

          </Container>
        )}
      </Draggable>
    );
  }
};