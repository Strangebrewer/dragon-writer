import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import { API, Scales } from "../../../utils";
import { DragonColumnFake } from "../../Dragons";

const editorStyle = {
  borderRadius: "6px",
  minHeight: "200px",
  maxHeight: "35vh",
  overflow: 'autor',
  minWidth: "60%",
  padding: "10px",
  fontFamily: "Arial, Helvetica, sans-serif"
};

const EditorStyles = styled.div`
  border-radius: 8px;
  border: 2px solid ${props => props.theme.links};
  max-height: ${props => props.inline && '70vh'};
  overflow: auto;
  margin-left: ${props => props.inline && '160px'};
  background: ${props => props.theme.editorBG};
  transition: background-color .2s ease-in-out;
  line-height: 1.4;
  font-family: Arial, Helvetica, sans-serif;
  color: ${props => props.theme.black};
  p {
    text-indent: 25px;
    font-size: 1.5rem;
  }
  ul {
    padding-top: 0;
    margin-top: 0;
  }
  box-shadow: ${props => props.theme.fieldShadow};
`;

const OuterContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background: transparent;
`;

const EditorOuter = styled.div`
  width: 100%;
  margin-right: 200px;
  border: none;
  border-radius: 2px;
  position: relative;
  align-self: center;
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

export class SingleUpdateEditor extends Component {

  updateText = async id => {
    const { given, state } = this.props;
    const textObject = {
      title: given.state.title,
      thesis: given.state.thesis,
      text: JSON.stringify(given.state.value.toJSON())
    }
    const text = await API.updateText(id, textObject);
    await this.props.toggleSingleEdit();
    const newState = Scales.updateTextHelper(text.data, state);
    this.props.executeOrderChanges(newState);
  };

  render() {
    const { given, texts } = this.props;
    return (
      <OuterContainer>
        <DragonColumnFake
          subject={given.state.subject}
          texts={texts}
        />

        <EditorOuter>
          <DragHeader>
            <p>{`Edit ${given.state.title}`}</p>
          </DragHeader>

          <EditorInner>
            <RenderButtons
              state={given.state}
              onClickMark={given.onClickMark}
              onClickBlock={given.onClickBlock}
              hasMark={given.hasMark}
              hasBlock={given.hasBlock}
            />

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

            <EditorStyles>
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
              onClick={() => this.updateText(this.props.text._id)}
            >
              Save
            </Button>
            <Button
              style={{ marginTop: "8px", marginRight: "8px" }}
              // if I don't place this in an anonymous function, it creates an error
              onClick={() => this.props.toggleSingleEdit()}
            >
              Cancel
            </Button>
          </EditorInner>
        </EditorOuter>
      </OuterContainer>
    );
  }
}