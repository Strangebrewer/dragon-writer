import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ModalLogic } from "../Renderers";
import { LinkBtn } from "../PageElements";
import { DragonTextEgg } from "./DragonTextEgg";
import { DragonTextEditable } from "./DragonTextEditable";

const TextColumn = styled.div`
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
`;

const SubjectHeading = styled.div`
  padding-bottom: 15px;
  padding-right: 200px;
  width: 100%;
`;

const Title = styled.h3`
  color: ${props => props.theme.titleColor};
  font-family: ${props => props.theme.hTypeface};
  font-size: 3.5rem;
  padding-bottom: 10px;
  text-align: center;
  width: 100%;
`;

const LinkFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  a {
    color: ${props => props.theme.mainColor};
    font-size: 1.8rem;
    margin: 3px 0 0 4px;
    text-decoration: underline;
    &:hover {
      color: #26d4cc;
    }
  }
`;

const DragonTextList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 8px 0;
`;

export class DragonTextNest extends Component {
  state = {}

  toggleEditable = textId => {
    this.setState({ [textId]: !this.state[textId] });
  }

  render() {
    const { subject, theme, _id } = this.props.subject;
    const { texts, projectLink } = this.props;
    return (
      <TextColumn>
        <SubjectHeading>
          <Title>Topic: {subject}</Title>
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

            {/* <LinkBtn
              fancy
              size="1.8rem"
              underline
            > */}
              <Link
                to={{
                  pathname: "/print",
                  state: { texts, subject: this.props.subject }
                }}>
                print view
              </Link>
            {/* </LinkBtn> */}
          </LinkFlexContainer>

        </SubjectHeading>
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


      </TextColumn>
    );
  }
};