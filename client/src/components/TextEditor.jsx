import React, { Component, Fragment } from 'react';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { plugins } from "./slate/utils/HotKeys";
import { renderMark, renderNode } from "./slate/utils/Renderers";
import { EditorStyles } from "./slate/utils/EditorStyles";
import { Button, Input, Label, Select } from "./Forms/FormElements";
import initialValue from "./slate/utils/value.json";
import RenderButtons from "./slate/RenderButtons.jsx";
import { API } from "../utils";

const DEFAULT_NODE = 'paragraph';

const editorStyle = {
  borderRadius: "6px",
  minHeight: "200px",
  minWidth: "60%",
  padding: "10px",
  fontFamily: "Arial, Helvetica, sans-serif"
};

const EditorOuter = styled.div`
  width: 100%;
  border: ${props => (
    props.inline
      ? "none"
      : "1px solid " + props.theme.mainColor
  )};
  border-radius: 2px;
  position: relative;
`;

const EditorInner = styled.div`
  width: 100%;
  padding: 5px 0 10px 10px;
`;

const DragHeader = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${props => props.theme.midGrey};
  font-family: ${props => props.theme.hTypeface};
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 2.4rem;
  color: ${props => props.theme.black};
`;

const MetaDataForm = styled.div`
  position: ${props => (
    props.inline
      ? "absolute"
      : "inherit"
  )};
  left: ${props => props.inline && '0'};
  top: ${props => props.inline && '40px'};
  width: ${props => props.inline && '160px'};
`;

class TextEditor extends Component {
  state = {
    value: Value.fromJSON(this.props.text ? this.props.text : initialValue),
    title: this.props.title || '',
    subject: this.props.subject || '',
    thesis: this.props.thesis || '',
    runUnmount: false,
  };

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  ref = editor => {
    this.editor = editor;
  };

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  onClickMark = (type) => {
    this.editor.toggleMark(type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  onClickBlock = (type) => {
    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  };

  createText = () => {
    const textObject = {
      projectId: this.props.projectId,
      subjectId: this.state.subject,
      title: this.state.title,
      thesis: this.state.thesis,
      text: JSON.stringify(this.state.value.toJSON())
    }
    API.createText(textObject)
      .then(res => {
        this.props.insertNewText(this.state.subject, res.data);
      })
      .catch(err => console.log(err));
  };

  updateText = async id => {
    const textObject = {
      title: this.state.title,
      thesis: this.state.thesis,
      text: JSON.stringify(this.state.value.toJSON())
    }
    const text = await API.updateText(id, textObject);
    await this.props.toggleEdit(id);
    this.props.updateChangedText(text.data);
  };

  render() {
    // if (props.id) then this editor is being used to update an existing text.
    const { id, inline, subjects, title } = this.props;
    console.log(this.props);
    return (
      <EditorOuter inline={inline}>
        <DragHeader inline={inline} {...this.props.dragHandle}>
          <p>{inline ? title : "Create New Text"}</p>
        </DragHeader>

        <EditorInner>
          <RenderButtons
            id={id}
            inline={inline}
            state={this.state}
            onClickMark={this.onClickMark}
            onClickBlock={this.onClickBlock}
            hasMark={this.hasMark}
            inline={this.props.inline}
            hasBlock={this.hasBlock}
            toggleEdit={this.props.toggleEdit}
          />

          <MetaDataForm inline={inline}>
            <Label>Title:</Label>
            <Input
              style={{ maxWidth: "300px" }}
              type="text"
              name="title"
              value={this.state.title}
              maxLength="22"
              placeholder="(22 char max)"
              onChange={this.handleInputChange}
            />
            <Label>Summary:</Label>
            <Input
              style={{ maxWidth: "300px" }}
              type="text"
              name="thesis"
              value={this.state.thesis}
              placeholder="enter a short description"
              onChange={this.handleInputChange}
            />
            {inline && (
              <Button
                style={{ marginTop: "8px", marginRight: "8px" }}
                disabled={!this.state.title || !this.state.subject}
                onClick={id ? () => this.updateText(id) : this.createText}
              >
                Save
              </Button>
            )}

            {id && inline
              ? (
                <Button
                  style={{ marginTop: "8px", marginRight: "8px" }}
                  onClick={() => this.props.toggleEdit(id)}
                >
                  Cancel
                </Button>
              ) : (
                inline &&
                <Button
                  style={{ marginTop: "8px", marginRight: "8px" }}
                  onClick={this.props.toggleEditor}
                >
                  Cancel
                  </Button>
              )}
          </MetaDataForm>

          {subjects && (
            <Fragment>
              <Label>Column:</Label>
              <Select
                style={{ maxWidth: "300px", width: "300px" }}
                value={this.state.subject}
                onChange={this.handleInputChange}
                name="subject"
              >
                <option value="">Select a column:</option>
                {subjects.map(subject => <option key={subject._id} value={subject._id}>{subject.subject}</option>)}
              </Select>
            </Fragment>
          )}

          <EditorStyles mode="write" inline={inline} isDragging={this.props.isDragging}>
            <Editor
              autoFocus
              style={editorStyle}
              plugins={plugins}
              ref={this.ref}
              value={this.state.value}
              onChange={this.onChange}
              renderMark={renderMark}
              renderNode={renderNode}
            />
          </EditorStyles>

          {!inline && (
            <Button
              style={{ marginTop: "8px", marginRight: "8px" }}
              disabled={!this.state.title || !this.state.subject}
              onClick={id ? () => this.updateText(id) : this.createText}
            >
              Save
          </Button>
          )}

          {id && !inline
            ? (
              <Button
                style={{ marginTop: "8px", marginRight: "8px" }}
                onClick={() => this.props.toggleEdit(id)}
              >
                Cancel
            </Button>
            ) : (
              !inline &&
              <Button
                style={{ marginTop: "8px", marginRight: "8px" }}
                onClick={this.props.toggleEditor}
              >
                Cancel
              </Button>
            )}
        </EditorInner>
      </EditorOuter>
    );
  };
}

export default TextEditor;