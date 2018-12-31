import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  background: transparent;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const DragonLair = ({ children }) => {
  return (
    <Droppable droppableId="all-subjects" direction="horizontal" type="subject">
      {provided => (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
}