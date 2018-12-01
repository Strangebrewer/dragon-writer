import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { EditorStyles } from "../utils/EditorStyles";
import { Button, Input, Label, Select } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import { API, Scales } from "../../../utils";

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

  createText = async () => {
    const { executeOrderChanges, given, projectId, state } = this.props;
    const textObject = {
      projectId: projectId,
      subjectId: given.state.subject,
      title: given.state.title,
      thesis: given.state.thesis,
      text: JSON.stringify(given.state.value.toJSON())
    };
    const newText = await API.createText(textObject);
    const newState = Scales.insertTextHelper(given.state.subject, newText.data, state);
    executeOrderChanges(newState);
  };

  render() {
    const { given, subjects } = this.props;
    return (
      <EditorOuter>
        <DragHeader {...this.props.dragHandle}>
          <p>Create New Text</p>
        </DragHeader>

        <EditorInner>
          <RenderButtons
            state={given.state}
            onClickMark={given.onClickMark}
            onClickBlock={given.onClickBlock}
            hasMark={given.hasMark}
            hasBlock={given.hasBlock}
          />

          <MetaDataForm>
            <Label>Title:</Label>
            <Input
              style={{ maxWidth: "300px" }}
              type="text"
              name="title"
              value={given.state.title}
              maxLength="22"
              placeholder="(22 char max)"
              onChange={given.handleInputChange}
            />
            <Label>Summary:</Label>
            <Input
              style={{ maxWidth: "300px" }}
              type="text"
              name="thesis"
              value={given.state.thesis}
              placeholder="enter a short description"
              onChange={given.handleInputChange}
            />
            <Label>Column:</Label>
            <Select
              style={{ maxWidth: "300px", width: "300px", marginBottom: '10px' }}
              value={given.state.subject}
              onChange={given.handleInputChange}
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
              ref={given.ref}
              value={given.state.value}
              onChange={given.onChange}
              renderMark={renderMark}
              renderNode={renderNode}
            />
          </EditorStyles>

          <Button
            style={{ marginTop: "8px", marginRight: "8px" }}
            disabled={!given.state.title || !given.state.subject}
            onClick={this.createText}
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