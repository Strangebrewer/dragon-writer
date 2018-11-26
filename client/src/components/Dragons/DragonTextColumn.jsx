import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import LinkBtn from "../Elements/LinkBtn";
import TextEditor from "../TextEditor";
import DragonTextItem from "./DragonTextItem";

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
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const EditorContainer = styled.div`
  width: 100%;
  max-width: 1150px;
  height: 100%;
  margin: auto;
  position: relative;
  transition: background-color .2s ease-in-out;
  background-color: ${props => (
    props.isDragging
      ? props.theme.pageBGLite
      : props.theme.pageBG
  )};
`;

const DragonTextColumn = props => {
  const { subject, theme, _id } = props.subject
  return (
    <TextColumn>
      <SubjectHeading>
        <Title title={theme}>Topic: {subject}</Title>
        <LinkBtn
          display="block"
          margin="auto"
          underline
          size="1.1rem"
          onClick={props.dragonTextOff}
        >
          return to overview
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
                  <Draggable key={text._id} draggableId={text._id} index={index}>
                    {(provided, snapshot) => (
                      <EditorContainer
                        key={text._id}
                        index={index}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                      // {...provided.dragHandleProps}
                      >
                        <TextEditor
                          id={text._id}
                          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                          dragHandle={provided.dragHandleProps}
                          index={index}
                          user={props.user}
                          inline="true"
                          isDragging={snapshot.isDragging}
                          subject={text.subjectId}
                          text={JSON.parse(text.text)}
                          title={text.title}
                          thesis={text.thesis}
                          toggleEdit={props.toggleEdit}
                          saveOrder={props.saveOrder}
                          getInitialData={props.getInitialData}
                          updateChangedText={props.updateChangedText}
                        />
                      </EditorContainer>
                    )}
                  </Draggable>
                ) : (
                  <DragonTextItem
                    key={text._id}
                    subject={props.subject}
                    text={text}
                    index={index}
                    toggleEdit={props.toggleEdit}
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
}

export default DragonTextColumn;