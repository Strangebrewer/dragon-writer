import React, { Component } from 'react';
import styled from 'styled-components';
import { Editor } from "slate-react";
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label, Select } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import {
  EditorWrapper,
  EditorStyles,
  Header,
  MetaDataForm
} from "./Styles";

export const SingleNewEditor = props => {
  const { createText, subjects } = props;
  const { subject, title } = props.state;
  return (
    <div style={{ display: 'flex', height: "100%", width: "100%" }}>
      <EditorWrapper style={{ maxWidth: '1100px' }}>
        <Header>
          <p>Create New Text</p>
        </Header>

        <MetaDataForm>
          <div>
            <Label>Title:</Label>
            <Input
              tabIndex="1"
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
              tabIndex="2"
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
              tabIndex="3"
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
          style={{
            background: '#ffffff87',
            border: '2px solid rgba(38, 212, 204, .5)',
            borderBottom: 'none'
          }}
          state={props.state}
          onClickBlock={props.onClickBlock}
          onClickLink={props.onClickLink}
          onClickMark={props.onClickMark}
          hasBlock={props.hasBlock}
          hasLinks={props.hasLinks}
          hasMark={props.hasMark}
        />

        <EditorStyles>
          <div>
            <Editor
              autoFocus
              plugins={plugins}
              ref={props.thisRef}
              value={props.state.value}
              onChange={props.onChange}
              onPaste={props.onPaste}
              renderMark={renderMark}
              renderNode={renderNode}
              tabIndex={4}
            />
          </div>
        </EditorStyles>

        <Button disabled={!title || !subject} onClick={createText}>
          Save
        </Button>

        <Button onClick={props.toggleSingleNewEditor}>
          Cancel
        </Button>
      </EditorWrapper>
    </div>
  );
};