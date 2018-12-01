import React, { Component, Fragment } from 'react';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { EditorStyles } from "../utils/EditorStyles";
import { Button, Input, Label, Select } from "../../Forms/FormElements";
import initialValue from "../utils/value.json";
import RenderButtons from "../RenderButtons.jsx";
import { API, Scales } from "../../../utils";

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
  border: none;
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
  position: absolute;
  left: 0;
  top: 40px;
  width: 160px;
`;

export class InlineUpdateEditor extends Component {
  state = {
    value: Value.fromJSON(this.props.text ? this.props.text : initialValue),
    title: this.props.title || '',
    subject: this.props.subject || '',
    thesis: this.props.thesis || '',
    incomingSubject: this.props.incomingSubject,
    incomingText: this.props.incomingText,
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

  updateText = async id => {
    const textObject = {
      title: this.state.title,
      thesis: this.state.thesis,
      text: JSON.stringify(this.state.value.toJSON())
    }
    const text = await API.updateText(id, textObject);
    text.data.parentSubject = this.props.incomingText.parentSubject;
    await this.props.toggleEditable(text.data._id);
    const newState = Scales.updateTextHelper(text.data, this.props.state);
    this.props.executeOrderChanges(newState);
  };

  render() {
    const { id, inline, title, } = this.props;
    return (
      <EditorOuter>
        <DragHeader {...this.props.dragHandle}>
          <p>{`Edit ${title}`}</p>
        </DragHeader>

        <EditorInner>
          <RenderButtons
            inline={inline}
            state={this.state}
            onClickMark={this.onClickMark}
            onClickBlock={this.onClickBlock}
            hasMark={this.hasMark}
            hasBlock={this.hasBlock}
          />

          <MetaDataForm>
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
            <Button
              style={{ marginTop: "8px", marginRight: "8px" }}
              disabled={!this.state.title || !this.state.subject}
              nerb="feck"
              onClick={() => this.updateText(id)}
            >
              Save
            </Button>
            <Button
              style={{ marginTop: "8px", marginRight: "8px" }}
              nerb="shizzle"
              onClick={() => this.props.toggleEditable(id)}
            >
              Cancel
            </Button>
          </MetaDataForm>

          <EditorStyles
            mode="write"
            inline={inline}
            isDragging={this.props.isDragging}
          >
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
        </EditorInner>
      </EditorOuter>
    );
  };
};