import React, { Component } from 'react';
import { Editor } from "slate-react";
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label, Select } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import {
  EditorInner,
  EditorOuter,
  EditorStyles,
  Header,
  MetaDataForm
} from "./Styles";

const addedStyles = {
  maxHeight: "35vh",
  minHeight: "300px",
  minWidth: "60%"
}

export const SingleNewEditor = props => {
  const { createText, subjects } = props;
  const { subject, title } = props.state;
  return (
    <EditorOuter>
      <Header>
        <p>Create New Text</p>
      </Header>

      <EditorInner>
        <MetaDataForm>
          <div>
            <Label>Title:</Label>
            <Input
              type="text"
              name="title"
              value={props.state.title}
              maxLength="22"
              placeholder="(22 char max)"
              onChange={props.handleInputChange}
            />
          </div>

          <div>
            <Label>Summary:</Label>
            <Input
              type="text"
              maxLength="140"
              name="thesis"
              value={props.state.thesis}
              placeholder="(140 char max)"
              onChange={props.handleInputChange}
            />
          </div>

          <div>
            <Label>Column:</Label>
            <Select
              value={props.state.subject}
              onChange={props.handleInputChange}
              name="subject"
            >
              <option value="">Select a column:</option>
              {subjects.map(subject => {
                const { _id } = subject;
                return <option key={_id} value={_id}>{subject.subject}</option>
              })}
            </Select>
          </div>
        </MetaDataForm>

        <RenderButtons
          style={{ paddingLeft: "5px", marginBottom: '2px' }}
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

        <Button disabled={!title || !subject} onClick={createText}>
          Save
          </Button>

        <Button onClick={props.toggleSingleNewEditor}>
          Cancel
          </Button>
      </EditorInner>
    </EditorOuter>
  );
};