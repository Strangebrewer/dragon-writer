import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";

const addedStyles = {
  maxHeight: "50vh",
  maxWidth: "unset",
  minHeight: "330px",
}

const EditorOuter = styled.div`
  border: none;
  border-radius: 2px;
  display: flex;
  position: relative;
  width: 100%;
  label {
    font-size: 1.9rem;
  }
`;

const EditorInner = styled.div`
  width: 100%;
`;

const MetaDataForm = styled.div`
  min-width: 240px;
  padding-right: 20px;
  width: 240px;
`;

const EditorStyles = styled.div`
  background: ${props => props.theme.editorBG};
  border: 2px solid rgba(38, 212, 204, .5);
  border-radius: 5px;
  box-shadow: ${props => props.theme.fieldShadow};
  color: ${props => props.theme.black};
  cursor: text;
  flex-grow: 1;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  max-width: 1000px;
  min-height: 35vh;
  overflow: auto;
  padding: 10px;
  transition: background-color .2s ease-in-out;
  width: 100%;
  p {
    font-size: 1.5rem;
    text-indent: 25px;
  }
  ul {
    margin-top: 0;
    padding-top: 0;
  }
`;

export const InlineUpdateEditor = props => {

  const { id, toggleEditable, updateText } = props;
  const { subject, title } = props.state;
  return (
    <EditorOuter {...props.dragHandle}>
      <MetaDataForm>
        <Label {...props.dragHandle}>Title:</Label>
        <Input
          type="text"
          name="title"
          value={props.state.title}
          maxLength="20"
          placeholder="(20 char max)"
          onChange={props.handleInputChange}
        />
        <Label {...props.dragHandle}>Summary:</Label>
        <Input
          type="text"
          maxLength="140"
          name="thesis"
          value={props.state.thesis}
          placeholder="(140 char max)"
          onChange={props.handleInputChange}
        />
        <Button disabled={!title || !subject} onClick={() => updateText(id)}>
          Save
        </Button>
        <Button onClick={() => toggleEditable(id)}>
          Cancel
        </Button>
      </MetaDataForm>

      <EditorInner {...props.dragHandle}>
        <RenderButtons
          inline={true}
          state={props.state}
          onClickBlock={props.onClickBlock}
          onClickLink={props.onClickLink}
          onClickMark={props.onClickMark}
          hasBlock={props.hasBlock}
          hasLinks={props.hasLinks}
          hasMark={props.hasMark}
        />

        <EditorStyles style={addedStyles}>
          <Editor
            autoFocus
            plugins={plugins}
            ref={props.thisRef}
            value={props.state.value}
            onChange={props.onChange}
            onPaste={props.onPaste}
            renderMark={renderMark}
            renderNode={renderNode}
          />
        </EditorStyles>
      </EditorInner>
    </EditorOuter>
  );
};