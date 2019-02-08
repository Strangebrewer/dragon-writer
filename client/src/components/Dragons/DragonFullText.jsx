import React, { Component, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { renderMark, renderNode } from "../slate/utils/Renderers";
import { LinkBtn } from "../PageElements";
import { Button } from "../Forms/FormElements";
import initialValue from "../slate/utils/value.json"

const Container = styled.div`
  background: ${props => (
    props.isDragging
      ? '#ffffff17'
      : 'linear-gradient(90deg, #00000000, #000000cb, #00000000)'
  )};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  justify-content: space-between;
  margin: auto;
  min-height: 140px;
  min-width: 600px;
  padding-right: 200px;
  position: relative;
  transition: background-color 0.2s ease-in-out, border 0.2s ease-in-out;
  width: 100%;
`;

const MetaDataContainer = styled.div`
  max-width: 240px;
  min-width: 240px;
  padding: 10px 30px 0 30px;
  text-align: right;
  h3 {
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 1;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    line-height: 1;
    margin: 0;
    padding: 4px 0 6px 0;
  }
`;

const EditorStyles = styled.div`
  background-image: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0.567), rgba(0,0,0,0.667), rgba(0,0,0,0.567), rgba(0,0,0,0));
  /* color transparency in hex code doesn't work on Edge
      so, I'm using the below background to deliberately force Edge to fall back to the one above
      while using the one below on Chrome because the same rgba numbers seem to look different on Chrome and Edge */
  background: linear-gradient(90deg, #00000000, #00000044, #00000000);
  border: none;
  border-radius: 8px;
  box-shadow: none;
  color: ${props => props.theme.editorColor};
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  overflow: auto;
  transition: background-color .2s ease-in-out;
  width: 100%;
  p {
    font-size: 2.2rem;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    text-indent: 25px;
  }
  ul {
    margin-top: 0;
    padding-top: 0;
  }
`;

const ImageContainer = styled.div`
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  height: 100%;
  min-width: 200px;
  padding: 5px 10px 20px 30px;
  width: 200px;
  img {
    align-self: flex-start;
    cursor: pointer;
    max-width: 100%;
    max-height: 100%;
  }
`;

export class DragonFullText extends Component {

  deleteTextModal = (textId, subjectId, index) => {
    this.props.setModal({
      body: <p>Are you sure you want to delete? This is permenent.</p>,
      buttons: (
        <div>
          <Button onClick={() => this.deleteText(textId, subjectId, index)}>
            Yes, delete it
          </Button>
          <Button onClick={this.props.closeModal}>
            Cancel
          </Button>
        </div>
      )
    })
  };

  deleteText = (textId, subjectId, index) => {
    this.props.deleteText(textId, subjectId, index);
    this.props.closeModal();
  };

  render() {
    const { index, text, subject, toggleEditable, uploadImageModal } = this.props;
    const { _id, largeImage, publicId } = text;
    const thisValue = text.text ? JSON.parse(text.text) : initialValue;
    text.parentSubject = subject;
    return (
      <React.Fragment>
        <Draggable key={text} draggableId={text._id} index={index}>
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
            >
              <MetaDataContainer>
                <h3>{text.title}</h3>
                <p>{text.thesis}</p>
                <LinkBtn
                  padding="2px 4px 10px 4px"
                  onClick={() => toggleEditable(text._id)}
                  title={`edit '${text.title}'`}
                >
                  <i className="fas fa-edit" />
                </LinkBtn>

                <LinkBtn
                  padding="0 2px 10px 3px"
                  onClick={() => uploadImageModal(text._id)}
                  disabled={text.image}
                  title={text.image
                    ? "you must delete the current image before uploading another"
                    : "upload image for this text"
                  }
                >
                  <i className="fas fa-upload"></i>
                </LinkBtn>

                <LinkBtn
                  padding="2px 4px 10px 4px"
                  onClick={() => this.props.imageModal(largeImage, publicId, _id, "text")}
                  disabled={!text.image}
                  title={text.image
                    ? "see image for this text"
                    : "no image has been uploaded for this text"
                  }
                >
                  <i className="far fa-images"></i>
                </LinkBtn>

                <LinkBtn
                  padding="2px 4px 10px 4px"
                  delete
                  onClick={() => this.deleteTextModal(text._id, subject._id, index)}
                  title={`delete '${text.title}'`}
                >
                  <i className="far fa-trash-alt" />
                </LinkBtn>
              </MetaDataContainer>

              <EditorStyles>
                <Editor
                  key={text._id}
                  index={index}
                  value={Value.fromJSON(thisValue)}
                  readOnly
                  renderMark={renderMark}
                  renderNode={renderNode}
                />
              </EditorStyles>

              <ImageContainer isDragging={snapshot.isDragging}>
                <img src={text.image} alt="" onClick={() => this.props.imageModal(largeImage, publicId, _id, "text")} />
              </ImageContainer>
            </Container>
          )}

        </Draggable>
      </React.Fragment>
    );
  }
};