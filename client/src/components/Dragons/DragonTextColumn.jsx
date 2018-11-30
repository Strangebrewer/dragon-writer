import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { LinkBtn } from "../Elements";
import { DragonTextItem } from "./DragonTextItem";
import { DragonTextEditable } from "./DragonTextEditable";

const TextColumn = styled.div`
  width: 80%;
  max-width: 1250px;
  margin: 0 auto;
  border-radius: 3px;
  padding-right: 200px;
  display: flex;
  flex-direction: column;
`;

const SubjectHeading = styled.div`
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.mainColor};
`;

const Title = styled.h3`
  font-family: ${props => props.theme.hTypeface};
  width: 100%;
  font-size: 3.5rem;
  text-align: center;
  padding-bottom: 10px;
  color: ${props => props.theme.titleColor};
`;

const DragonTextList = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const DragonTextColumn = props => {
  const { subject, theme, _id } = props.subject
  console.log(props.subjects);
  return (
    <TextColumn>
      <SubjectHeading>
        <Title title={theme}>Topic: {subject}</Title>
        <LinkBtn
          block
          fancy
          size="1.5rem"
          margin="auto"
          underline
          onClick={props.dragonTextOff}
        >
          return to project overview
         </LinkBtn>
      </SubjectHeading>

      <Droppable droppableId={_id} >
        {(provided, snapshot) => (
          <DragonTextList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.texts.map((text, index) => {
              console.log(text);
              return props.state[text._id]
                ? (
                  <DragonTextEditable
                    key={text._id}
                    index={index}
                    incomingSubject={props.incomingSubject}
                    incomingText={props.incomingText}
                    text={text}
                    subject={props.subject}
                    subjects={props.subjects}
                    user={props.user}
                    toggleEdit={props.toggleEdit}
                    saveOrder={props.saveOrder}
                    getInitialData={props.getInitialData}
                    updateChangedText={props.updateChangedText}
                  />
                ) : (
                  <DragonTextItem
                    key={text._id}
                    subject={props.subject}
                    subjects={props.subjects}
                    text={text}
                    index={index}
                    toggleEdit={props.toggleEdit}
                    toggleEditor={props.toggleEditor}
                    deleteText={props.deleteText}
                  />
                )
            })}
            {provided.placeholder}
          </DragonTextList>
        )}
      </Droppable>
    </TextColumn>
  );
};