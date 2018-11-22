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

const DragonTextList = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  transition: background-color 1s ease;
  background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};
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
    const { index } = this.props;
    console.log(_id);
    return (
      <TextColumn>
        <LinkBtn onClick={this.props.dragonTextOn}>overview</LinkBtn>
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
                    <Draggable key={text._id}draggableId={text._id} index={index}>
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
                            inline={true}
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