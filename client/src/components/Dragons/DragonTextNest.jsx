import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ModalLogic } from "../Renderers";
import { LinkBtn } from "../PageElements";
import { DragonTextEgg } from "./DragonTextEgg";
import { DragonTextEditable } from "./DragonTextEditable";

const TextColumn = styled.div`
  width: 100%;
  /* max-width: 1450px; */
  margin: 0 auto;
  border-radius: 3px;
  padding-right: 300px;
  display: flex;
  flex-direction: column;
`;

const SubjectHeading = styled.div`
  width: 100%;
  padding-bottom: 15px;
  padding-left: 100px;
  /* border-bottom: 1px solid ${props => props.theme.mainColor}; */
`;

const Title = styled.h3`
  font-family: ${props => props.theme.hTypeface};
  width: 100%;
  font-size: 3.5rem;
  text-align: center;
  padding-bottom: 10px;
  color: ${props => props.theme.titleColor};
`;

const LinkFlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DragonTextList = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PrintPage = styled.div`
  height: 792px;
  width: 612px;
  padding: 'none';
  background: white;
  box-shadow: 5px 5px 5px black;
  margin: auto;
  overflow: hidden;
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
          <LinkFlexContainer>
            <LinkBtn
              // block
              fancy
              size="1.8rem"
              underline
              // toggleDragonText must be inside an anonymous function,
              // otherwise it throws an error thinking it's trying to reuse
              // the argument that was passed to it when it was toggled on.
              onClick={() => this.props.toggleDragonText()}
            >
              project overview
            </LinkBtn>
            <LinkBtn
              // block
              fancy
              size="1.8rem"
              underline
              // toggleDragonText must be inside an anonymous function,
              // otherwise it throws an error thinking it's trying to reuse
              // the argument that was passed to it when it was toggled on.
              onClick={() => this.props.toggleStoryboard(_id)}
            >
              storyboard
            </LinkBtn>
          </LinkFlexContainer>

        </SubjectHeading>

        {this.state.printable
          ? (
            <React.Fragment>

            </React.Fragment>
          ) : (
            <Droppable droppableId={_id} >
              {(provided, snapshot) => (
                <DragonTextList
                  id="pdf-test"
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
          )
        }


      </TextColumn>
    );
  }
};