import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ModalLogic } from "../Renderers";
import { LinkBtn } from "../PageElements";
import { DragonTextEgg } from "./DragonTextEgg";
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

export class DragonTextNest extends Component {
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
            size="1.8rem"
            margin="auto"
            underline
            // this must be inside an anonymous function,
            // otherwise it throws an error thinking it's trying to reuse
            // the parameter passed to the argument when it was toggled on
            // ...or something.
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
                      saveOrder={this.props.saveOrder}
                      executeDragonStateChanges={this.props.executeDragonStateChanges}
                      getInitialData={this.props.getInitialData}
                    />
                  ) : (
                    <ModalLogic>
                      {modalProps => (
                        <DragonTextEgg
                          {...modalProps}
                          key={text._id}
                          subject={this.props.subject}
                          subjects={this.props.subjects}
                          text={text}
                          index={index}
                          toggleEditable={this.toggleEditable}
                          deleteText={this.props.deleteText}
                        />
                      )}
                    </ModalLogic>

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