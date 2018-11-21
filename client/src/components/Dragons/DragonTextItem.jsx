import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { renderMark, renderNode } from "../slate/utils/Renderers";
import initialValue from "../slate/utils/value.json"

const TextContainer = styled.div`
  width: 100%;
  margin: 5px 0;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 8px;
`;

const TextTitle = styled.h3`
  font-size: 2.5rem;
  line-height: 1;
  font-weight: bold;
  margin: 0;
`;

const LinkBtn = styled.button`
  background: transparent;
  border: none;
  outline: transparent;
  color: ${props => props.theme.secondary};
  padding: 0 10px 0 0;
  text-decoration: underline;
  cursor: pointer;
`;

class DragonTextItem extends Component {
  render() {
    const { index, text, subject, toggleEdit, deleteText } = this.props;
    const thisValue = text.text ? JSON.parse(text.text) : initialValue; 
    console.log(subject);
    return (
      <Draggable draggableId={text._id ? text._id : "fuck"} index={index}>
        {(provided, snapshot) => (
          <TextContainer
            {...provided.draggableProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
          >
            <TextTitle>{text.title}</TextTitle>

            <LinkBtn
              onClick={() => toggleEdit(text._id)}>edit</LinkBtn>
            <LinkBtn
              onClick={() => deleteText(text._id, subject._id, index)}>delete</LinkBtn>

            <Editor
              key={text._id}
              index={index}
              value={Value.fromJSON(thisValue)}
              readOnly
              renderMark={renderMark}
              renderNode={renderNode}
            />
          </TextContainer>
        )}

      </Draggable>
    );
  }
}

export default DragonTextItem;