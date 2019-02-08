import React from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import { DragonColumnFake } from "../../Dragons";

const OuterContainer = styled.div`
  background: transparent;
  display: flex;
  height: 100%;
  width: 100%;
`;

const EditorOuter = styled.div`
  align-self: center;
  background: rgba(38, 212, 204, 0.267);
  border: none;
  border-radius: 20px;
  box-shadow: inset 0 0 100px 30px rgb(0,0,0);
  margin-right: 200px;
  padding: 30px;
  position: relative;
  height: 100%;
  width: 100%;
`;

const EditorInner = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1000px;
  min-height: 100%;
  width: 100%;
  label, input {
    min-width: 50%;
  }
`;

const Header = styled.div`
  font-family: ${props => props.theme.hTypeface};
  font-size: 3rem;
  width: 100%;
`;

const EditorStyles = styled.div`
  background: ${props => props.theme.editorBG};
  border: 2px solid ${props => props.theme.links};
  border-radius: 6px;
  box-shadow: ${props => props.theme.fieldShadow};
  color: ${props => props.theme.black};
  flex-grow: 1;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  max-width: 1000px;
  min-height: 100%;
  overflow: auto;
  padding: 10px;
  transition: background-color .2s ease-in-out;
  width: 100%;
  p {
    font-size: 1.5rem;
    text-indent: 25px;
  }
  ul {
    margin-top: 0;
    padding-top: 0;
  }
`;

export const InlineNewEditor = props => {
  const { createText, texts, toggleInlineNew } = props;
  const { subject, title } = props.state;
  return (
    <OuterContainer>
      <DragonColumnFake
        subject={props.state.subject}
        texts={texts}
      />

      <EditorOuter>
        <EditorInner>
          <Header>
            <p>New text for: &nbsp;{subject.subject}</p>
          </Header>

          <Label>Title:</Label>
          <Input
            style={{ maxWidth: "300px" }}
            type="text"
            name="title"
            value={props.state.title}
            maxLength="22"
            placeholder="(22 char max)"
            onChange={props.handleInputChange}
          />
          <Label>Summary:</Label>
          <Input
            style={{ maxWidth: "300px" }}
            type="text"
            maxLength="140"
            name="thesis"
            value={props.state.thesis}
            placeholder="(140 char max)"
            onChange={props.handleInputChange}
          />


          <RenderButtons
            style={{ paddingLeft: "5px" }}
            state={props.state}
            onClickMark={props.onClickMark}
            onClickBlock={props.onClickBlock}
            hasMark={props.hasMark}
            hasBlock={props.hasBlock}
          />

          <EditorStyles>
            <Editor
              autoFocus
              plugins={plugins}
              ref={props.thisRef}
              value={props.state.value}
              onChange={props.onChange}
              renderMark={renderMark}
              renderNode={renderNode}
            />
          </EditorStyles>

          <div style={{ paddingLeft: "5px" }}>
            <Button
              disabled={!title || !subject}
              onClick={createText}
              width="70px"
            >
              Save
            </Button>
            {/* if I don't place this in an anonymous function, it creates an error */}
            <Button
              onClick={() => toggleInlineNew()}
              width="70px"
            >
              Cancel
            </Button>
          </div>
        </EditorInner>
      </EditorOuter>
    </OuterContainer>
  );
};