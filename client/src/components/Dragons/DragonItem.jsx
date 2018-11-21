import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import dateFns from "date-fns";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 6px 8px 4px 8px;
  transition: background-color 1s ease;
  background-color: ${props =>
    props.isDragDisabled
      ? 'lightgray'
      : props.isDragging
        ? 'lightgreen'
        : 'white'
  };
  h4 {
    font-size: 1.7rem;
    font-weight: bold;
    padding-bottom: 2px;
  }
  p {
    font-size: 1.3rem;
    padding-left: 12px;
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  z-index: 999;
  top: 4px;
  right: 2px;
  color: ${props => props.theme.primary};
  font-size: .9rem;
  outline: transparent;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  &:hover, &:focus {
    color: ${props => props.theme.secondary};
    cursor: pointer;
  }
`;

const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateText = styled.h5`
    display: inline-block;
    font-size: 1rem;
    font-weight: normal;
    margin-top: 8px;
`;

class DragonItem extends Component {
  render() {
    const { text, subjectId } = this.props;
    console.log(this.props);
    return (
      <Draggable
        draggableId={text}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
          >
            <DeleteBtn onClick={() => this.props.deleteText(text._id, subjectId, this.props.index)}>
              delete
            </DeleteBtn>

            <h4>{text.title}</h4>
            <p>{text.thesis}</p>

            <DateDiv>
              <DateText>
                created: {dateFns.format(text.createdAt, "MMM DD, YYYY")}
              </DateText>

              <DateText>
                modified: {dateFns.format(text.updatedAt, "MMM DD, YYYY")}
              </DateText>
            </DateDiv>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default DragonItem;