import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label, Select } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";

const EditorOuter = styled.div`
  align-self: center;
  background: rgba(38, 212, 204, 0.267);
  border: none;
  border-radius: 40px;
  box-shadow: inset 0 0 100px 30px rgb(0,0,0);
  margin: auto;
  max-width: 1100px;
  padding: 40px;
  position: relative;
  width: 100%;
`;

const Header = styled.div`
  font-family: ${props => props.theme.hTypeface};
  font-size: 3rem;
  text-align: center;
  width: 100%;
`;

const EditorInner = styled.div`
  padding: 10px;
  width: 100%;
`;

const MetaDataForm = styled.div`
  position: inherit;
`;

const EditorStyles = styled.div`
  background: ${props => props.theme.editorBG};
  border: 2px solid ${props => props.theme.links};
  border-radius: 6px;
  box-shadow: ${props => props.theme.fieldShadow};
  color: ${props => props.theme.black};
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  max-height: 35vh;
  min-height: 300px;
  min-width: 60%;
  overflow: auto;
  padding: 10px;
  transition: background-color .2s ease-in-out;
  width: 100%;
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

export class SingleNewEditor extends Component {

  render() {
    const { createText, subjects } = this.props;
    const { subject, title } = this.props.state;
    return (
      <EditorOuter>
        <Header>
          <p>Create New Text</p>
        </Header>

        <EditorInner>
          <RenderButtons
            state={this.props.state}
            onClickMark={this.props.onClickMark}
            onClickBlock={this.props.onClickBlock}
            hasMark={this.props.hasMark}
            hasBlock={this.props.hasBlock}
          />

          <MetaDataForm>
            <Label>Title:</Label>
            <Input
              style={{ maxWidth: "300px" }}
              type="text"
              name="title"
              value={this.props.state.title}
              maxLength="22"
              placeholder="(22 char max)"
              onChange={this.props.handleInputChange}
            />
            <Label>Summary:</Label>
            <Input
              style={{ maxWidth: "300px" }}
              type="text"
              maxLength="140"
              name="thesis"
              value={this.props.state.thesis}
              placeholder="(140 char max)"
              onChange={this.props.handleInputChange}
            />
            <Label>Column:</Label>
            <Select
              style={{ maxWidth: "300px", width: "300px" }}
              value={this.props.state.subject}
              onChange={this.props.handleInputChange}
              name="subject"
            >
              <option value="">Select a column:</option>
              {subjects.map(subject => {
                const { _id } = subject;
                return <option key={_id} value={_id}>{subject.subject}</option>
              })}
            </Select>
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

          <Button disabled={!title || !subject} onClick={createText}>
            Save
          </Button>

          <Button onClick={this.props.toggleSingleNewEditor}>
            Cancel
          </Button>
        </EditorInner>
      </EditorOuter>
    );
  };
};