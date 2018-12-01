import React, { Component } from 'react';
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ColumnContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background: transparent;
`;

export const DropZone = ({ children }) => {
  return (
    <Droppable droppableId="all-subjects" direction="horizontal" type="subject">
      {provided => (
        <ColumnContainer {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </ColumnContainer>
      )}
    </Droppable>
  );
}