import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";

const EditorStyles = styled.div`
  background: ${props => props.theme.editorBG};
  border: 2px solid ${props => props.theme.links};
  border-radius: 8px;
  box-shadow: ${props => props.theme.fieldShadow};
  color: ${props => props.theme.black};
  cursor: text;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  margin-left: 240px;
  max-height: 50vh;
  min-height: 300px;
  overflow: auto;
  padding: 10px;
  transition: background-color .2s ease-in-out;
  width: calc(100% -200px);
  p {
    font-size: 1.5rem;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    text-indent: 25px;
  }
  ul {
    margin-top: 0;
    padding-top: 0;
  }
`;

const EditorOuter = styled.div`
  border: none;
  border-radius: 2px;
  position: relative;
  width: 100%;
`;

const EditorInner = styled.div`
  padding: 5px 0 10px 10px;
  width: 100%;
  label {
    font-size: 1.9rem;
  }
`;

const MetaDataForm = styled.div`
  padding: 0 10px;
  position: absolute;
  left: 10px;
  top: 20px;
  width: 240px;
`;

export class InlineUpdateEditor extends Component {

  render() {
    const { id, toggleEditable, updateText } = this.props;
    const { subject, title } = this.props.state;
    return (
      <EditorOuter>
        <EditorInner {...this.props.dragHandle}>
          <RenderButtons
            inline={true}
            state={this.props.state}
            onClickMark={this.props.onClickMark}
            onClickBlock={this.props.onClickBlock}
            hasMark={this.props.hasMark}
            hasBlock={this.props.hasBlock}
          />

          <MetaDataForm>
            <Label {...this.props.dragHandle}>Title:</Label>
            <Input
              type="text"
              name="title"
              value={this.props.state.title}
              maxLength="20"
              placeholder="(20 char max)"
              onChange={this.props.handleInputChange}
            />
            <Label {...this.props.dragHandle}>Summary:</Label>
            <Input
              type="text"
              maxLength="140"
              name="thesis"
              value={this.props.state.thesis}
              placeholder="(140 char max)"
              onChange={this.props.handleInputChange}
            />
            <Button disabled={!title || !subject} onClick={() => updateText(id)}>
              Save
            </Button>
            <Button onClick={() => toggleEditable(id)}>
              Cancel
            </Button>
          </MetaDataForm>

          <EditorStyles>
            <Editor
              autoFocus
              plugins={plugins}
              ref={this.props.thisRef}
              value={this.props.state.value}
              onChange={this.props.onChange}
              renderMark={renderMark}
              renderNode={renderNode}
            />
          </EditorStyles>
        </EditorInner>
      </EditorOuter>
    );
  };
};