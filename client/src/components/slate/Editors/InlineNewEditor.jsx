import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import { DragonNestFake } from "../../Dragons";

const editorStyle = {
  borderRadius: "6px",
  fontFamily: "Arial, Helvetica, sans-serif",
  maxHeight: "35vh",
  minHeight: "200px",
  minWidth: "60%",
  overflow: 'autor',
  padding: "10px"
};

const EditorStyles = styled.div`
  background: ${props => props.theme.editorBG};
  border: 2px solid ${props => props.theme.links};
  border-radius: 8px;
  color: ${props => props.theme.black};
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  margin-left: ${props => props.inline && '160px'};
  max-height: ${props => props.inline && '70vh'};
  overflow: auto;
  transition: background-color .2s ease-in-out;
  p {
    font-size: 1.5rem;
    text-indent: 25px;
  }
  ul {
    margin-top: 0;
    padding-top: 0;
  }
  box-shadow: ${props => props.theme.fieldShadow};
`;

const OuterContainer = styled.div`
  background: transparent;
  display: flex;
  height: 100%;
  width: 100%;
`;

const EditorOuter = styled.div`
  align-self: center;
  border: none;
  border-radius: 2px;
  margin-right: 200px;
  position: relative;
  width: 100%;
`;

const EditorInner = styled.div`
  padding: 5px 0 10px 10px;
  width: 100%;
`;

const DragHeader = styled.div`
  align-items: center;
  background-color: ${props => props.theme.midGrey};
  color: ${props => props.theme.black};
  display: flex;
  font-family: ${props => props.theme.hTypeface};
  font-size: 2.4rem;
  height: 30px;
  padding-left: 10px;
  position: absolute;
  top: 0;
  width: 100%;
`;

export class InlineNewEditor extends Component {

  render() {
    const { createText, texts, toggleInlineNew } = this.props;
    const { subject, title } = this.props.state;
    return (
      <OuterContainer>
        <DragonNestFake
          subject={this.props.state.subject}
          texts={texts}
        />

        <EditorOuter>
          <DragHeader>
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

            <EditorStyles>
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

            <Button disabled={!title || !subject} onClick={createText}>
              Save
            </Button>

            {/* if I don't place this in an anonymous function, it creates an error */}
            <Button onClick={() => toggleInlineNew()}>
              Cancel
            </Button>
          </EditorInner>
        </EditorOuter>

      </OuterContainer>
    );
  }
};