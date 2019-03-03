import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import { EditorStyles } from "./Styles";

const addedStyles = {
  maxHeight: "50vh",
  maxWidth: "unset",
  minHeight: "300px",
  marginLeft: "240px",
  width: "calc(100% - 200px)"
}

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

export const InlineUpdateEditor = props => {

  const { id, toggleEditable, updateText } = props;
  const { subject, title } = props.state;
  return (
    <EditorOuter>
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