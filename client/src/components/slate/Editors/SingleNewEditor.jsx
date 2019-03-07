import React, { Component } from 'react';
import styled from 'styled-components';
import { Editor } from "slate-react";
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label, Select } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
// import {
//   EditorInner,
//   EditorOuter,
//   EditorStyles,
//   Header,
//   MetaDataForm
// } from "./Styles";

const addedStyles = {
  maxHeight: "35vh",
  minHeight: "300px",
  minWidth: "60%"
}

const EditorOuter = styled.div`
  background: ${props => props.isDragging ? "rgba(22, 136, 130, 0.1)" : "rgba(22, 136, 130, 0.2)"};
  border-top: 1px solid rgb(22, 136, 130);
  border-right: 1px solid #ffffff32;
  border-left: 1px solid rgba(18, 110, 106, .6);
  border-bottom: 1px solid #aaaaaa32;
  box-shadow: 4px 4px 4px rgb(0,0,0);
  margin: auto;
  padding: 10px 40px 40px 40px;
  width: 1000px;
`;

const EditorStyles = styled.div`
  background: #ececec;
  color: #393939;
  font-size: 1.6rem;
  padding: 20px 30px;
`;

const Header = styled.div`
  color: #fff;
  font-family: ${props => props.theme.hTypeface};
  font-size: 4rem;
  margin-bottom: 10px;
  text-align: center;
  text-shadow: 0 0 2px #000, 0 0 3px #111, 0 0 10px rgba(38, 212, 204, .7);
`;

const MetaDataForm = styled.div`
  input, select {
    border: none;
    border-bottom: 1px solid #fff;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    color: white;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 1.8rem;
    padding: 6px 5px 2px 15px;
    width: 100%;
  }
  option {
    background: rgba(22, 136, 130);
  }
`;

export const SingleNewEditor = props => {
  const { createText, subjects } = props;
  const { subject, title } = props.state;
  return (
    <div style={{ display: 'flex', height: "100%", width: "100%" }}>
      <EditorOuter>
        <Header>
          <p>Create New Text</p>
        </Header>

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
          style={{
            marginBottom: '2px', width: '100%', display: 'flex',
            justifyContent: 'space-between'
          }}
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
      </EditorOuter>
    </div>
  );
};