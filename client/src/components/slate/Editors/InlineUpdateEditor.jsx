import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { EditorStyles } from "../utils/EditorStyles";
import { Button, Input, Label } from "../../Forms/FormElements";
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
  border: none;
  border-radius: 2px;
  position: relative;
`;

const EditorInner = styled.div`
  width: 100%;
  padding: 5px 0 10px 10px;
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
  position: absolute;
  left: 0;
  top: 40px;
  width: 160px;
`;

export class InlineUpdateEditor extends Component {

  updateText = async id => {
    const { given, state } = this.props;
    const textObject = {
      title: given.state.title,
      thesis: given.state.thesis,
      text: JSON.stringify(given.state.value.toJSON())
    }
    const text = await API.updateText(id, textObject);
    await this.props.toggleEditable(text.data._id);
    const newState = Scales.updateTextHelper(text.data, state);
    this.props.executeOrderChanges(newState);
  };

  render() {
    const { given, id, inline } = this.props;
    return (
      <EditorOuter>
        <DragHeader {...this.props.dragHandle}>
          <p>{`Edit ${this.props.title}`}</p>
        </DragHeader>

        <EditorInner>
          <RenderButtons
            inline={inline}
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
            <Button
              style={{ marginTop: "8px", marginRight: "8px" }}
              disabled={!given.state.title || !given.state.subject}
              nerb="feck"
              onClick={() => this.updateText(id)}
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
              ref={given.ref}
              value={given.state.value}
              onChange={given.onChange}
              renderMark={renderMark}
              renderNode={renderNode}
            />
          </EditorStyles>
        </EditorInner>
      </EditorOuter>
    );
  };
};