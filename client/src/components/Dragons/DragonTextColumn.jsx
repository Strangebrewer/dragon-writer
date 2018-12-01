import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { LinkBtn } from "../Elements";
import { DragonTextItem } from "./DragonTextItem";
import { DragonTextEditable } from "./DragonTextEditable";
import { API, Scales } from "../../utils";

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

export class DragonTextColumn extends Component {
  state = {}

  toggleEditable = textId => {
    this.setState({ [textId]: !this.state[textId] });
  }

  render() {
    const { subject, theme, _id } = this.props.subject
    console.log(this.props.subjects);
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
            onClick={this.props.dragonTextOff}
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
              {this.props.texts.map((text, index) => {
                console.log(text);
                return this.state[text._id]
                  ? (
                    <DragonTextEditable
                      key={text._id}
                      index={index}
                      incomingSubject={this.props.incomingSubject}
                      text={text}
                      state={this.props.state}
                      subject={this.props.subject}
                      subjects={this.props.subjects}
                      user={this.props.user}
                      toggleEditable={this.toggleEditable}
                      toggleEdit={this.props.toggleEdit}
                      toggleEditor={this.props.toggleEditor}
                      saveOrder={this.props.saveOrder}
                      executeOrderChanges={this.props.executeOrderChanges}
                      getInitialData={this.props.getInitialData}
                      updateChangedText={this.props.updateChangedText}
                    />
                  ) : (
                    <DragonTextItem
                      key={text._id}
                      subject={this.props.subject}
                      subjects={this.props.subjects}
                      text={text}
                      index={index}
                      toggleEdit={this.props.toggleEdit}
                      toggleEditor={this.props.toggleEditor}
                      toggleEditable={this.toggleEditable}
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
};