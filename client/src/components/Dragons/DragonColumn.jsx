import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragonItem from "./DragonItem";

const Container = styled.div`
  position: relative;
  width: 260px;
  min-width: 260px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.bg};
`;

const SubjectHeader = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
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
  padding-top: 136px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 5px;
  transition: all .2s ease-in-out;
  border-color: ${props => (
    props.isDraggingOver
      ? props.theme.linkHover
      : props.theme.link
  )};
  border-width: 2px;
  border-style: solid;
  box-shadow: ${props => (
    props.isDraggingOver
      ? props.theme.columnBs
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
  border-top: 1px solid ${props => props.theme.color};
  min-height: 75px;
  color: ${props => props.theme.text};
  text-align: center;
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
            <DragonBtn onClick={() => this.props.dragonTextOn(_id)}>see full text</DragonBtn>
            <CloseButton onClick={() => this.props.toggleSubject(_id)}>&times;</CloseButton>

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
                  {this.props.texts.map((text, index) => (
                    <DragonItem
                      key={text._id}
                      index={index}
                      text={text}
                      subjectId={_id}
                      deleteText={this.props.deleteText}
                      loading={this.props.loading}
                      dragging={this.props.dragging}
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