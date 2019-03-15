import React, { Component, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import RenderButtons from "../slate/RenderButtons";
import { plugins } from "../slate/utils/HotKeys";
import { renderMark, renderNode } from "../slate/utils/Renderers";
import { EditorLogic } from "../Renderers";
import { LinkBtn } from "../PageElements";
import { Button } from "../Forms/FormElements";
import initialValue from "../slate/utils/value.json"

const addedStyles = {
  backgroundColor: "rgba(38, 212, 204, 0.067)",
  color: "#bbb",
  cursor: 'text'
}

const Container = styled.div`
  /* background: ${props => props.isDragging && '#ffffff17'}; */
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  margin: auto;
  min-height: 140px;
  min-width: 600px;
  outline: transparent;
  padding-right: 440px;
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
background: ${props => props.isDragging ? '#ffffff17' : "#000000aa"};
  /* background: #000000aa; */
  border: none;
  /* border-radius: 8px; */
  box-shadow: none;
  color: ${props => props.theme.editorColor};
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  overflow: auto;
  padding: 0 40px;
  position: relative;
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

// const ImageContainer = styled.div`
//   border-bottom-right-radius: 10px;
//   border-top-right-radius: 10px;
//   display: flex;
//   height: 100%;
//   min-width: 200px;
//   padding: 20px 10px 20px 20px;
//   width: 200px;
//   img {
//     align-self: flex-start;
//     cursor: pointer;
//     /* if I make this 100%, it creates a sliver of space between texts */
//     max-width: 99%;
//   }
// `;

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
    const { props } = this;
    const { index, text, schema, subject, toggleEditable, toggleEditableOn, uploadImageModal } = this.props;
    const { _id, largeImage, publicId } = text;
    const thisValue = text.text ? JSON.parse(text.text) : initialValue;
    console.log(this.props.state)
    text.parentSubject = subject;
    return (
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

            <EditorStyles
              {...provided.dragHandleProps}
              isDragging={snapshot.isDragging}
              onDoubleClick={() => toggleEditableOn(text._id)}
            >
              {this.props.editable
                ? (
                  <EditorLogic
                    callback={toggleEditable}
                    executeDragonStateChanges={this.props.executeDragonStateChanges}
                    incomingText={text}
                    state={this.props.state}
                    subject={text.subjectId}
                    text={JSON.parse(text.text)}
                    thesis={text.thesis}
                    title={text.title}
                  >
                    {editorprops => (
                      <Fragment>
                        <RenderButtons
                          {...editorprops}
                          inline="true"
                        />
                        <div style={{ marginTop: '50px' }}>
                          <button onClick={() => editorprops.updateText(text._id)}>Save</button>
                          <button onClick={() => toggleEditable(text._id)}>Cancel</button>
                        </div>
                        <Editor
                          {...editorprops}
                          style={addedStyles}
                          title={text.title}
                          dragHandle={provided.dragHandleProps}
                          id={text._id}
                          inline="true"
                          isDragging={snapshot.isDragging}
                          title={text.title}
                          toggleEditable={toggleEditable}
                          autoFocus
                          onDrop={editorprops.onDropOrPaste}
                          onPaste={editorprops.onDropOrPaste}
                          plugins={plugins}
                          ref={editorprops.thisRef}
                          value={editorprops.state.value}
                          renderMark={renderMark}
                          renderNode={renderNode}
                          schema={editorprops.schema}
                        />
                      </Fragment>
                    )}
                  </EditorLogic>

                )
                : (
                  <Editor
                    key={text._id}
                    index={index}
                    readOnly
                    renderMark={renderMark}
                    renderNode={renderNode}
                    schema={schema}
                    value={Value.fromJSON(thisValue)}
                  />
                )
              }
            </EditorStyles>
          </Container>
        )}

      </Draggable>
    );
  }
};