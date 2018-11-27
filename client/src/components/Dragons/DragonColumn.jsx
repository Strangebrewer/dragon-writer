import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { LinkBtn } from "../Elements";
import { DragonItem } from "./DragonItem";

const Container = styled.div`
  position: relative;
  width: 260px;
  min-width: 260px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.pageBGLite};
`;

const SubjectHeader = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
`;

const DragonList = styled.div`
  padding: 8px;
  padding-top: 136px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 5px;
  transition: all .2s ease-in-out;
  border-color: ${props => (
    props.isDraggingOver
      ? props.theme.columnDragBorder
      : props.theme.links
  )};
  border-width: 2px;
  border-style: solid;
  box-shadow: ${props => (
    props.isDraggingOver
      ? props.theme.columnBS
      : "none"
  )};
`;

const Heading3 = styled.div`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  padding: 0 8px;
  margin: 5px 0 10px 0;
`;

const Paragraph = styled.p`
  margin: 0 10px;
  font-size: 1.5rem;
  padding: 8px;
  border-top: 1px solid ${props => props.theme.mainColor};
  min-height: 75px;
  color: ${props => props.theme.mainColor};
  text-align: center;
`;

export const DragonColumn = props => {
  const { subject, theme, _id } = props.subject;
  return (
    <Draggable draggableId={_id} index={props.index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <LinkBtn
            title="expand column to show full texts"
            position="absolute"
            top="6px"
            left="4px"
            padding="0 0 5px 4px"
            onClick={() => props.dragonTextOn(_id)}
          >
            see full text
           </LinkBtn>

          <LinkBtn
            title="close this column"
            position="absolute"
            top="2px"
            right="3px"
            padding="0 4px 5px 0"
            size="2rem"
            onClick={() => props.toggleSubject(_id)}
          >
            &times;
           </LinkBtn>

          <SubjectHeader {...provided.dragHandleProps}>
            <Heading3>{subject}</Heading3>
            <Paragraph>{theme}</Paragraph>
          </SubjectHeader>

          <Droppable droppableId={_id} type="text">
            {(provided, snapshot) => (
              <DragonList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.texts.map((text, index) => (
                  <DragonItem
                    key={text._id}
                    index={index}
                    text={text}
                    subjectId={_id}
                    deleteText={props.deleteText}
                    loading={props.loading}
                    dragging={props.dragging}
                  />
                ))}
                {provided.placeholder}
              </DragonList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
};