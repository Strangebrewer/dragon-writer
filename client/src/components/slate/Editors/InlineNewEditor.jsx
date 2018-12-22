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

export class InlineNewEditor extends Component {

  render() {
    const { texts } = this.props;
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

            <Button
              style={{ marginTop: "8px", marginRight: "8px" }}
              disabled={!this.props.state.title || !this.props.state.subject}
              onClick={this.props.createText}
            >
              Save
            </Button>

            <Button
              style={{ marginTop: "8px", marginRight: "8px" }}
              // if I don't place this in an anonymous function, it creates an error
              onClick={() => this.props.toggleInlineNew()}
            >
              Cancel
            </Button>
          </EditorInner>
        </EditorOuter>

      </OuterContainer>
    );
  }
};