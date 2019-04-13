import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ImageUploader, LinkBtn } from "../PageElements";
import { DragonFullText } from "./DragonFullText";
import { DragonThumb } from "./DragonElements";
import { API } from '../../utils';

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px 30px;
  width: 100%;
  min-height: 100vh;
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
  position: relative;
`;

const ImageThumbs = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  right: 20px;
  width: 421px;
  height: 80vh;
  top: 160px;
  /* border: 1px solid red; */
  overflow: auto;
  align-content: flex-start;
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
  state = {
    editable: false,
    editables: 0,
    images: []
  }

  async componentDidMount() {
    const res = await API.getImages(this.buildHeaders());
    this.setState({ images: res.data.images });
  }

  buildHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { "Authorization": `Bearer ${token}` } };
  }

  toggleEditable = textId => {
    let editables = 0;
    let editable = true;
    if (this.state[textId])
      if (this.state.editables > 1) editables = this.state.editables - 1;
      else editable = false;
    else
      editables = this.state.editables + 1;
    this.setState({ [textId]: !this.state[textId], editables, editable });
  }

  toggleEditableOn = textId => {
    this.setState({
      [textId]: true,
      editable: true,
      editables: this.state.editables + 1
    });
  }

  render() {
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
                  {...provided.droppableprops}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <ImageUploader
                    addImageToText={this.props.addImageToText}
                  >
                    {provided => (
                      this.props.texts.map((text, index) => (
                        <DragonFullText
                          {...provided}
                          deleteText={this.props.deleteText}
                          editable={this.state[text._id]}
                          executeDragonStateChanges={this.props.executeDragonStateChanges}
                          incomingSubject={this.props.incomingSubject}
                          index={index}
                          key={text._id}
                          state={this.props.state}
                          subject={this.props.subject}
                          subjects={this.props.subjects}
                          text={text}
                          toggleEditable={this.toggleEditable}
                          toggleEditableOn={this.toggleEditableOn}
                          user={this.props.user}
                        />
                      ))
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
        {this.state.editable && (
          <ImageThumbs>
            {this.state.images.map(image => (
              <DragonThumb
                id={image._id}
                src={image.thumbnail}
                url={image.midImage}
              />
            ))}
          </ImageThumbs>
        )}
      </TextColumn>
    );
  }
};