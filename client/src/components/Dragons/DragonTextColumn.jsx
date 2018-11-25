import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
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
  border-bottom: 1px solid ${props => props.theme.color};
`;

const Title = styled.h3`
font-family: ${props => props.theme.heading};
  width: 100%;
  font-size: 3.5rem;
  text-align: center;
  padding-bottom: 10px;
  color: ${props => props.theme.hcolor};
`;

const LinkBtn = styled.button`
  background: transparent;
  border: none;
  outline: transparent;
  display: block;
  margin: auto;
  color: ${props => props.theme.link};
  text-decoration: underline;
  cursor: pointer;
  font-size: 1.1rem;
  &:hover {
    color: ${props => props.theme.linkHover};
  }
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
  transition: background-color .2s ease;
  background-color: ${props => (
    props.isDragging
      ? props.theme.bgLite
      : props.theme.bg
  )};
`;

class DragonTextColumn extends Component {
  render() {
    const { subject, theme, _id } = this.props.subject
    return (
      <TextColumn>
        <SubjectHeading>
          <Title title={theme}>Topic: {subject}</Title>
          <LinkBtn onClick={this.props.dragonTextOff}>return to overview</LinkBtn>
        </SubjectHeading>

        <Droppable droppableId={_id} >
          {(provided, snapshot) => (
            <DragonTextList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.texts.map((text, index) => {
                console.log(text);
                return this.props.state[text._id]
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
                            user={this.props.user}
                            inline="true"
                            subject={text.subjectId}
                            text={JSON.parse(text.text)}
                            title={text.title}
                            thesis={text.thesis}
                            toggleEdit={this.props.toggleEdit}
                            saveOrder={this.props.saveOrder}
                            getInitialData={this.props.getInitialData}
                            updateChangedText={this.props.updateChangedText}
                          />
                        </EditorContainer>
                      )}
                    </Draggable>
                  ) : (
                    <DragonTextItem
                      key={text._id}
                      subject={this.props.subject}
                      text={text}
                      index={index}
                      toggleEdit={this.props.toggleEdit}
                      deleteText={this.props.deleteText}
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
}

export default DragonTextColumn;