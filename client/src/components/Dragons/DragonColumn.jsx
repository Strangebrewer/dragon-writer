import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragonItem from "./DragonItem";

const Container = styled.div`
  position: relative;
  width: 260px;
  min-width: 260px;
  margin: 0 10px;
  border: 1px solid ${props => props.theme.link};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  color: ${props => props.theme.link};
  font-size: 1.8rem;
  outline: transparent;
  background-color: transparent;
  border: none;
  &:hover, &:focus {
    color: ${props => props.theme.linkHover};
    text-decoration: none;
    cursor: pointer;
  }
`;

const DragonBtn = styled.button`
  position: absolute;
  top: 7px;
  left: 3px;
  color: ${props => props.theme.link};
  font-size: 1.1rem;
  outline: transparent;
  background-color: transparent;
  border: none;
  &:hover, &:focus {
    color: ${props => props.theme.linkHover};
    text-decoration: none;
    cursor: pointer;
  }
`;

const DragonList = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  transition: background-color 1s ease;
  background-color: ${props => (
    props.isDraggingOver
      ? props.theme.midGrey
      : props.theme.bg
  )};
`;

const Heading3 = styled.div`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  padding: 0 8px;
  margin-top: 25px;
`;

const Paragraph = styled.div`
  margin: 8px;
  font-size: 1.5rem;
  padding: 8px;
  background-color: ${props => props.theme.offwhite};
  min-height: 75px;
  color: ${props => props.theme.bg};
  display: flex;
  align-items: center;
`;

class DragonColumn extends Component {
  render() {
    const { subject, theme, _id } = this.props.subject;
    return (
      <Draggable draggableId={_id} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <DragonBtn onClick={() => this.props.dragonTextOn(_id)}>full text</DragonBtn>
            <CloseButton onClick={() => this.props.toggleSubject(_id)}>&times;</CloseButton>
            <Heading3 {...provided.dragHandleProps}>{subject}</Heading3>
            <Paragraph><p>{theme}</p></Paragraph>
            <Droppable droppableId={_id} type="text">
              {(provided, snapshot) => (
                <DragonList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.texts.map((text, index) => (
                    <DragonItem
                      key={text._id}
                      index={index}
                      text={text}
                      subjectId={_id}
                      deleteText={this.props.deleteText}
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
  }
};

export default DragonColumn;