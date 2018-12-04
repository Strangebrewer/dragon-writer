import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { InlineUpdateEditor, TextEditor } from "../Slate/Editors";

const Container = styled.div`
  width: 100%;
  max-width: 1150px;
  display: flex;
  height: 100%;
  position: relative;
  transition: background-color .2s ease-in-out;
  background-color: ${props => (
    props.isDragging
      ? props.theme.pageBGLite
      : props.theme.pageBG
  )};
`;

export class DragonTextEditable extends Component {
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
            <TextEditor
              callback={toggleEditable}
              executeDragonStateChanges={executeDragonStateChanges}
              incomingText={text}
              state={this.props.state}
              subject={text.subjectId}
              text={JSON.parse(text.text)}
              thesis={text.thesis}
              title={text.title}
            >
              {given => (
                <InlineUpdateEditor
                  dragHandle={provided.dragHandleProps}
                  given={given}
                  id={text._id}
                  inline="true"
                  isDragging={snapshot.isDragging}
                  title={text.title}
                  toggleEditable={toggleEditable}
                />
              )}
            </TextEditor>

          </Container>
        )}
      </Draggable>
    );
  }
};