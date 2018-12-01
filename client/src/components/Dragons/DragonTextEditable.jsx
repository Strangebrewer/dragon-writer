import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import { InlineUpdateEditor, TextEditor } from "../slate/Editors";

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
      executeOrderChanges,
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
              incomingText={text}
              subject={text.subjectId}
              text={JSON.parse(text.text)}
              thesis={text.thesis}
              title={text.title}
            >
              {given => (
                <InlineUpdateEditor
                  executeOrderChanges={executeOrderChanges}
                  dragHandle={provided.dragHandleProps}
                  given={given}
                  id={text._id}
                  inline="true"
                  isDragging={snapshot.isDragging}
                  state={this.props.state}
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