import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ImageUploader, LinkBtn } from "../PageElements";
import { DragonFullText } from "./DragonFullText";
import { DragonTextEditable } from "./DragonTextEditable";

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px 30px;
  width: 100%;
`;

const SubjectHeading = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 200px 15px 0;
  h3 {
    color: ${props => props.theme.titleColor};
    font-family: ${props => props.theme.hTypeface};
    font-size: 3.5rem;
    padding: 0 0 10px 0;
    text-align: center;
    width: 100%;
  }
  a {
    color: #26d4cc;
    font-size: 1.8rem;
    margin: 3px 0 0 4px;
    text-decoration: underline;
    transition: ${props => props.theme.colorTrans}, text-shadow 0.15s ease-in-out;
    &:hover {
      color: #fff;
    }
  }
`;

const DragonTextList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const NothingContainer = styled.div`
  padding-right: 200px;
  text-align: center;
  h2 {
    font-family: ${props => props.theme.hTypeface};
    font-size: 5rem;
    padding: 15px 0px 15px 0;
  }
  h3 {
    font-size: 2rem;
  }
`;

export class DragonFullTextColumn extends Component {
  state = {}

  toggleEditable = textId => {
    this.setState({ [textId]: !this.state[textId] });
  }

  render() {
    console.log(this.props.subject);
    const { _id, subject } = this.props.subject;
    const { texts } = this.props;
    return (
      <TextColumn>
        <SubjectHeading>
          <h3>Topic: {subject}</h3>
          <LinkBtn
            size="1.8rem"
            underline
            text
            // toggleDragonText must be inside an anonymous function,
            // otherwise it throws an error thinking it's trying to reuse
            // the argument that was passed to it when it was toggled on.
            onClick={() => this.props.toggleDragonText()}
          >
            project overview
            </LinkBtn>
          <LinkBtn
            size="1.8rem"
            underline
            text
            // toggleDragonText must be inside an anonymous function,
            // otherwise it throws an error thinking it's trying to reuse
            // the argument that was passed to it when it was toggled on.
            onClick={() => this.props.toggleStoryboard(_id)}
          >
            storyboard
            </LinkBtn>

          <Link
            to={{
              pathname: "/print",
              state: { texts, subject: this.props.subject }
            }}>
            print view
              </Link>
        </SubjectHeading>

        {this.props.texts.length > 0
          ? (
            <Droppable droppableId={_id} >
              {(provided, snapshot) => (
                <DragonTextList
                  id="pdf-test"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <ImageUploader
                    addImageToText={this.props.addImageToText}
                  >
                    {provided => (
                      this.props.texts.map((text, index) => {
                        return this.state[text._id]
                          ? (
                            <DragonTextEditable
                              {...provided}
                              executeDragonStateChanges={this.props.executeDragonStateChanges}
                              key={text._id}
                              incomingSubject={this.props.incomingSubject}
                              index={index}
                              state={this.props.state}
                              subject={this.props.subject}
                              subjects={this.props.subjects}
                              text={text}
                              toggleEditable={this.toggleEditable}
                              user={this.props.user}
                            />
                          ) : (
                            <DragonFullText
                              {...provided}
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
                  </ImageUploader>
                  {provided.placeholder}
                </DragonTextList>
              )}
            </Droppable>
          ) : (
            <NothingContainer>
              <h2>Full Text View</h2>
              <h3>(You don't have any texts under this topic yet)</h3>
            </NothingContainer>
          )
        }
      </TextColumn>
    );
  }
};