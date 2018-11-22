import React, { Component, Fragment } from 'react';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { plugins } from "./slate/utils/HotKeys";
import { renderMark, renderNode } from "./slate/utils/Renderers";
import { Button, Input, Select } from "./Elements/FormElements";
import initialValue from "./slate/utils/value.json";
import RenderButtons from "./slate/RenderButtons.jsx";
import API from "../utils/API";

const DEFAULT_NODE = 'paragraph';

const editorStyle = {
  border: "1px solid black",
  minHeight: "200px",
  minWidth: "60%",
  padding: "10px",
  fontFamily: "Arial, Helvetica, sans-serif"
};

const DragHandle = styled.div`
  width: 30px;
  height: 30px;
  background-color: orange;
  border: 1px solid ${props => props.theme.black};
  border-radius: 3px;
  position: absolute;
  top: 50px;
  right: 10px;
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
    return value.activeMarks.some(mark => mark.type == type);
  };

  onClickMark = (type) => {
    this.editor.toggleMark(type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type == type);
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
        return !!document.getClosest(block.key, parent => parent.type == type);
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
        // empty editor fields (maybe)
        // do whatever else you want to do with the creation of a new text.
        // this.setState({ runUnmount: true });
      })
      .catch(err => console.log(err));
  };

  updateText = async id => {
    const textObject = {
      title: this.state.title,
      text: JSON.stringify(this.state.value.toJSON())
    }
    const text = await API.updateText(id, textObject);
    await this.props.toggleEdit(id);
    this.props.updateChangedText(text.data);
  };

  render() {
    // if (props.id) then this editor is being used to update an existing text.
    const { id, subjects } = this.props;
    console.log(this.props);
    return (
      <Fragment>
        <DragHandle {...this.props.dragHandle} />
        <RenderButtons
          id={id}
        state={this.state}
        onClickMark={this.onClickMark}
        onClickBlock={this.onClickBlock}
        hasMark={this.hasMark}
        hasBlock={this.hasBlock}
        toggleEdit={this.props.toggleEdit}
        />
        <Input
          style={{ maxWidth: "300px" }}
          type="text"
          name="title"
          value={this.state.title}
          maxLength="22"
          placeholder="enter a title (22 char max)"
          onChange={this.handleInputChange}
        />
        <Input
          style={{ maxWidth: "300px" }}
          type="text"
          name="thesis"
          value={this.state.thesis}
          placeholder="enter a short thesis statement"
          onChange={this.handleInputChange}
        />
        {subjects && (
          <Select
            style={{ maxWidth: "300px", width: "300px" }}
            value={this.state.subject}
            onChange={this.handleInputChange}
            name="subject"
          >
            <option value="">Select a subject:</option>
            {subjects.map(subject => <option key={subject._id} value={subject._id}>{subject.subject}</option>)}
          </Select>
        )}
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
        <Button
          style={{ marginTop: "8px", marginRight: "8px" }}
          disabled={!this.state.title || !this.state.subject}
          onClick={id ? () => this.updateText(id) : this.createText}
        >
          Save
            </Button>
        {id &&
          <Button
            style={{ marginTop: "8px", marginRight: "8px" }}
            onClick={() => this.props.toggleEdit(id)}
          >
            Cancel
              </Button>}
      </Fragment>
    );
  };
}

export default TextEditor;