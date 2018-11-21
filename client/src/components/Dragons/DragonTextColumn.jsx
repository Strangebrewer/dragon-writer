import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import TextEditor from "../TextEditor";
import DragonTextItem from "./DragonTextItem";

const TextColumn = styled.div`
  width: 60%;
  margin: auto;
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

class DragonTextColumn extends Component {
  render() {
    const { subject, theme, _id } = this.props.subject
    const { index } = this.props;
    console.log(this.props)
    return (
      <TextColumn>
        <LinkBtn onClick={this.props.dragonTextOn}>fuck</LinkBtn>
        {/* subject heading info here... */}
        <Droppable droppableId={_id} >
          {(provided, snapshot) => (
            <DragonTextList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.texts.map((text, index) => {
                console.log(text);
                return this.props.state[text._id]
                  ? (
                    <TextEditor
                      key={text._id}
                      index={index}
                      id={text._id}
                      inline={true}
                      subject={text.subjectId}
                      text={JSON.parse(text.text)}
                      title={text.title}
                      toggleEdit={this.props.toggleEdit}
                      getProjects={this.props.getProjects}
                      getSubjects={this.props.getSubjects}
                    />
                  ) : (
                    <DragonTextItem
                      key={text._id ? text._id : index}
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
      //   )}
      // </Draggable>
    );
  }
}

export default DragonTextColumn;