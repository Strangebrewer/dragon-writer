import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  background: transparent;
  display: flex;
  height: calc(100%);
  overflow: auto;
  padding-left: 200px;
  position: relative;
`;

export const MainDropZone = ({ children }) => {
  return (
    <Droppable droppableId="all-subjects" direction="horizontal" type="subject">
      {provided => (
        <Container {...provided.droppableprops} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
}