import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { EditorStyles } from "../utils/EditorStyles";
import { Button, Input, Label, Select } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";

const editorStyle = {
  borderRadius: "6px",
  minHeight: "200px",
  minWidth: "60%",
  padding: "10px",
  fontFamily: "Arial, Helvetica, sans-serif"
};

const EditorOuter = styled.div`
  width: 100%;
  border: 1px solid ${props => props.theme.mainColor};
  border-radius: 2px;
  position: relative;
`;

const EditorInner = styled.div`
  width: 100%;
  padding: 10px;
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
  position: inherit;
`;

export class SingleNewEditor extends Component {

  render() {
    const { subjects } = this.props;
    return (
      <EditorOuter>
        <DragHeader {...this.props.dragHandle}>
          <p>Create New Text</p>
        </DragHeader>

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
              style={{ maxWidth: "300px", width: "300px", marginBottom: '10px' }}
              value={this.props.state.subject}
              onChange={this.props.handleInputChange}
              name="subject"
            >
              <option value="">Select a column:</option>
              {subjects.map(subject => <option key={subject._id} value={subject._id}>{subject.subject}</option>)}
            </Select>
          </MetaDataForm>

          <EditorStyles mode="write">
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

          <Button
            style={{ marginTop: "8px", marginRight: "8px" }}
            disabled={!this.props.state.title || !this.props.state.subject}
            onClick={this.props.createText}
          >
            Save
          </Button>

          <Button
            style={{ marginTop: "8px", marginRight: "8px" }}
            onClick={this.props.toggleSingleNewEditor}
          >
            Cancel
          </Button>
        </EditorInner>
      </EditorOuter>
    );
  };
};