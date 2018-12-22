import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ModalLogic } from "../Renderers";
import { LinkBtn } from "../PageElements";
import { DragonTextEgg } from "./DragonTextEgg";
import { DragonTextEditable } from "./DragonTextEditable";
import { EditorStyles } from "../slate/utils/EditorStyles";

const TextColumn = styled.div`
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  border-radius: 3px;
  padding-right: 400px;
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

export class DragonTextNest extends Component {
  state = {}

  toggleEditable = textId => {
    this.setState({ [textId]: !this.state[textId] });
  }

  render() {
    const { subject, theme, _id } = this.props.subject
    return (
      <TextColumn>
        <SubjectHeading>
          <Title title={theme}>Topic: {subject}</Title>
          <LinkBtn
            block
            fancy
            size="1.8rem"
            margin="auto"
            underline
            // toggleDragonText must be inside an anonymous function,
            // otherwise it throws an error thinking it's trying to reuse
            // the argument that was passed to it when it was toggled on.
            onClick={() => this.props.toggleDragonText()}
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
              <ModalLogic>
                {modalProps => (
                  this.props.texts.map((text, index) => {
                    return this.state[text._id]
                      ? (
                        <DragonTextEditable
                          {...modalProps}
                          key={text._id}
                          index={index}
                          incomingSubject={this.props.incomingSubject}
                          text={text}
                          state={this.props.state}
                          subject={this.props.subject}
                          subjects={this.props.subjects}
                          user={this.props.user}
                          toggleEditable={this.toggleEditable}
                          executeDragonStateChanges={this.props.executeDragonStateChanges}
                          getInitialData={this.props.getInitialData}
                        />
                      ) : (
                        <DragonTextEgg
                          {...modalProps}
                          deleteText={this.props.deleteText}
                          index={index}
                          key={text._id}
                          subject={this.props.subject}
                          subjects={this.props.subjects}
                          text={text}
                          toggleEditable={this.toggleEditable}
                        />
                      )
                  })
                )}
              </ModalLogic>
              {provided.placeholder}
            </DragonTextList>
          )}
        </Droppable>
      </TextColumn>
    );
  }
};