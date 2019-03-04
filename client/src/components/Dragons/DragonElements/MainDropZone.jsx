import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  background: transparent;
  height: calc(100%);
  overflow: hidden;
  padding-left: 200px;
  /* padding-right: 250px; */
  position: relative;
  width: calc(100vw + 250px);
`;

const Inner = styled.div`
  background: transparent;
  display: flex;
  /* margin: auto; */
  min-height: calc(100% + 20px);
  overflow-x: auto;
  padding-bottom: 20px;
  padding-right: 250px;
  width: 100%;
`;

export const MainDropZone = ({ children }) => {
  return (
    <Container>
      <Droppable droppableId="all-subjects" direction="horizontal" type="subject">
        {provided => (
          <Inner {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </Inner>
        )}
      </Droppable>
    </Container>
  );
}