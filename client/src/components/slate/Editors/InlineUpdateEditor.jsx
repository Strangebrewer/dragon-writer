import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { EditorStyles } from "../utils/EditorStyles";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";

const editorStyle = {
  borderRadius: "6px",
  cursor: 'text',
  fontFamily: "Arial, Helvetica, sans-serif",
  minHeight: "300px",
  minWidth: "80%",
  padding: "10px",
};

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
  position: absolute;
  left: 10px;
  top: 10px;
  width: 150px;
`;

export class InlineUpdateEditor extends Component {

  render() {
    console.log(this.props);
    const { id, inline } = this.props;
    return (
      <EditorOuter>

        <EditorInner {...this.props.dragHandle}>
          <RenderButtons
            inline={inline}
            state={this.props.state}
            onClickMark={this.props.onClickMark}
            onClickBlock={this.props.onClickBlock}
            hasMark={this.props.hasMark}
            hasBlock={this.props.hasBlock}
          />

          <MetaDataForm>
            <Label {...this.props.dragHandle}>Title:</Label>
            <Input
              style={{ maxWidth: "300px" }}
              type="text"
              name="title"
              value={this.props.state.title}
              maxLength="22"
              placeholder="(22 char max)"
              onChange={this.props.handleInputChange}
            />
            <Label {...this.props.dragHandle}>Summary:</Label>
            <Input
              style={{ maxWidth: "300px" }}
              type="text"
              maxLength="140"
              name="thesis"
              value={this.props.state.thesis}
              placeholder="(140 char max)"
              onChange={this.props.handleInputChange}
            />
            <Button
              style={{ marginTop: "8px", marginRight: "8px" }}
              disabled={!this.props.state.title || !this.props.state.subject}
              nerb="feck"
              onClick={() => this.props.updateText(id)}
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