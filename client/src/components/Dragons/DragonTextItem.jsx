import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { renderMark, renderNode } from "../slate/utils/Renderers";
import initialValue from "../slate/utils/value.json"

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 0;
`;

const MetaDataContainer = styled.div`
  min-width: 160px;
  max-width: 160px;
  text-align: right;
  padding-right: 20px;
`;

const StylingContainer = styled.div`
  line-height: 1.3;
`;

const TextTitle = styled.h3`
  font-size: 1.5rem;
  line-height: 1;
  font-weight: bold;
  margin: 0;
`;

const TextThesis = styled.p`
  line-height: 1;
  font-size: 1.3rem;
  margin: 0;
  padding: 4px 0 6px 0;
`;

const LinkBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.1rem;
  outline: transparent;
  color: ${props => props.theme.secondary};
  padding: 2px 0 2px 8px;
  text-decoration: underline;
  cursor: pointer;
`;

class DragonTextItem extends Component {
  render() {
    const { index, text, subject, toggleEdit, deleteText } = this.props;
    const thisValue = text.text ? JSON.parse(text.text) : initialValue;
    console.log(text);
    return (
      <Draggable key={text} draggableId={text._id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
          >
            <MetaDataContainer>
              <TextTitle>{text.title}</TextTitle>
              <TextThesis>{text.thesis}</TextThesis>
              <LinkBtn
                onClick={() => toggleEdit(text._id)}>edit</LinkBtn>
              <LinkBtn
                onClick={() => deleteText(text._id, subject._id, index)}>delete</LinkBtn>
            </MetaDataContainer>

            <StylingContainer>
              <Editor
                key={text._id}
                index={index}
                value={Value.fromJSON(thisValue)}
                readOnly
                renderMark={renderMark}
                renderNode={renderNode}
              />
            </StylingContainer>
          </Container>
        )}

      </Draggable>
    );
  }
}

export default DragonTextItem;