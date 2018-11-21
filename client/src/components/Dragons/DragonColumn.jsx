import React, { Component, Fragment } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import dateFns from "date-fns";
import DragonItem from "./DragonItem";
import API from '../../utils/API';

const Container = styled.div`
  position: relative;
  width: 260px;
  min-width: 260px;
  margin: 0 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  color: #aaa;
  font-size: 1.8rem;
  outline: transparent;
  background-color: transparent;
  border: none;
  &:hover, &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const DragonBtn = styled.button`
  position: absolute;
  top: 2px;
  left: 2px;
  color: #aaa;
  font-size: 1rem;
  outline: transparent;
  background-color: transparent;
  border: none;
  &:hover, &:focus {
    color: black;
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
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};
`;

const Heading3 = styled.div`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  padding: 10px 8px;
`;

const Paragraph = styled.div`
  margin: 8px;
  font-size: 1.2rem;
  padding: 8px;
  background-color: ${props => props.theme.offwhite};
  height: 65px;
`;

class DragonColumn extends Component {
  state = {

  };

  render() {
    const { subject, theme, _id } = this.props.subject
    console.log(this.props.subject)
    return (
      <Draggable draggableId={_id} index={this.props.index}>
        {provided => (
          <Container {...provided.draggableProps} innerRef={provided.innerRef}>
            <DragonBtn onClick={() => this.props.dragonTextOff(_id)}>full text</DragonBtn>
            <CloseButton onClick={() => this.props.toggleSubject(_id)}>&times;</CloseButton>
            <Heading3 {...provided.dragHandleProps}>{subject}</Heading3>
            <Paragraph>{theme}</Paragraph>
            <Droppable droppableId={_id} type="text">
              {(provided, snapshot) => (
                <DragonList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.texts.map((text, index) => {
                    console.log(text);
                    return <DragonItem key={text._id} index={index} text={text} subjectId={_id} deleteText={this.props.deleteText} />
                  })}
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