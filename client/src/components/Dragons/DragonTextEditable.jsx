import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { EditorLogic } from "../Renderers";
import { InlineUpdateEditor } from "../slate/Editors";

const Container = styled.div`
  background: ${props => (
    props.isDragging
      ? 'rgba(110, 110, 110, 0.7)'
      : 'rgba(38, 212, 204, 0.267)'
  )};
  border-radius: 10px;
  box-shadow: inset 0 0 100px 30px rgb(0,0,0);
  display: flex;
  justify-content: space-between;
  padding: 40px 20px;
  transition: background-color .2s ease-in-out;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  height: 100%;
  max-height: 100%;
  width: 400px;
  min-width: 400px;
  img {
    /* margin: auto; */
    align-self: flex-start;
    max-height: 100%;
    max-width: 100%;
    padding-top: 40px;
  }
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
      executeDragonStateChanges,
      index,
      text,
      toggleEditable,
    } = this.props;
    return (
      <Draggable key={text._id} draggableId={text._id} index={index}>
        {(provided, snapshot) => (
          <Container
            className="dgn-txt-full-edit"
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
              {editorprops => (
                <InlineUpdateEditor
                  {...editorprops}
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
              <img src={text.image} alt="" onClick={() => this.fullSizeImageModal(text.largeImage)} />
            </ImageContainer>
          </Container>
        )}
      </Draggable>
    );
  }
};