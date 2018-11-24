import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import TextEditor from "../TextEditor";
import DragonTextItem from "./DragonTextItem";

const TextColumn = styled.div`
  width: 60%;
  margin: 0 auto;
  border-radius: 3px;
  padding-right: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${props => (
    props.isDraggingOver
      ? props.theme.midGrey
      : props.theme.bg
  )};
`;

const SubjectHeading = styled.div`
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.color};
`;

const Title = styled.h3`
font-family: ${props => props.theme.heading};
  width: 100%;
  font-size: 4.5rem;
  text-align: center;
  /* font-weight: bold; */
  padding-bottom: 5px;
  color: ${props => props.theme.hcolor};
`;

const Theme = styled.p`
  width: 60%;
  text-align: center;
  margin: 0 auto 5px auto;
  font-size: 1.5rem;
  line-height: 1.2;
  padding: 5px;
  font-weight: bold;
  /* background-color: ${props => props.theme.offwhite}; */
`;

const LinkBtn = styled.button`
  background: transparent;
  border: none;
  outline: transparent;
  display: block;
  margin: auto;
  color: ${props => props.theme.link};
  padding: 0 10px 0 0;
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
  transition: background-color 1s ease;
  background-color: ${props => (
    props.isDraggingOver
      ? props.theme.midGrey
      : props.theme.bg
  )};
`;

const EditorContainer = styled.div`
  width: 100%;
  max-width: 1150px;
  height: 100%;
  margin: auto;
  position: relative;
`;

class DragonTextColumn extends Component {
  render() {
    const { subject, theme, _id } = this.props.subject
    return (
      <TextColumn>
        <SubjectHeading>
          <Title>{subject}</Title>
          <Theme>{theme}</Theme>
          <LinkBtn onClick={this.props.dragonTextOff}>return to overview</LinkBtn>
        </SubjectHeading>

        {/* subject heading info here... */}
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