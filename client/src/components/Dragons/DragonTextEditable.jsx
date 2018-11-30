import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import TextEditor from "../TextEditor";

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
      incomingSubject,
      incomingText,
      index,
      subjects,
      user,
      toggleEdit,
      saveOrder,
      getInitialData,
      updateChangedText
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
              id={text._id}
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              dragHandle={provided.dragHandleProps}
              index={index}
              user={user}
              inline={incomingText ? 'true' : null}
              incomingSubject={incomingSubject}
              incomingText={incomingText}
              isDragging={snapshot.isDragging}
              subject={text.subjectId}
              subjects={subjects}
              text={JSON.parse(text.text)}
              title={text.title}
              thesis={text.thesis}
              toggleEdit={toggleEdit}
              saveOrder={saveOrder}
              getInitialData={getInitialData}
              updateChangedText={updateChangedText}
            />
          </Container>
        )}
      </Draggable>
    );
  }
};