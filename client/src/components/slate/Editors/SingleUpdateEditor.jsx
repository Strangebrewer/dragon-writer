import React, { Component } from 'react';
import { Editor } from "slate-react";
import styled from 'styled-components';
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import { DragonColumnFake } from "../../Dragons";
import { StoryboardCardFake } from "../../Storyboard";

const EditorStyles = styled.div`
  background: ${props => props.theme.editorBG};
  border: 2px solid ${props => props.theme.links};
  border-radius: 6px;
  box-shadow: ${props => props.theme.fieldShadow};
  color: ${props => props.theme.black};
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  max-height: 35vh;
  max-width: 1000px;
  min-height: 35vh;
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
  padding: 20px;
  position: relative;
  width: 100%;
`;

const EditorInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  max-width: 1000px;
  width: 100%;
  label {
    width: 100%;
  }
`;

const Header = styled.div`
  font-family: ${props => props.theme.hTypeface};
  font-size: 3rem;
  text-align: center;
  width: 100%;
`;

export class SingleUpdateEditor extends Component {

  render() {
    const { storyboardOn, texts, toggleSingleEdit, updateText } = this.props;
    const { subject, title } = this.props.state;
    const { _id } = this.props.text;
    return (
      <OuterContainer>
        {storyboardOn
          ? (
            <StoryboardCardFake
              text={this.props.text}
            />
          ) : (
            <DragonColumnFake
              subject={this.props.state.subject}
              texts={texts}
            />
          )}

        <EditorOuter>
          <Header>
            <p>Edit: &nbsp;{this.props.state.title}</p>
          </Header>

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
              maxLength="20"
              placeholder="(20 char max)"
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
                plugins={plugins}
                ref={this.props.thisRef}
                value={this.props.state.value}
                onChange={this.props.onChange}
                renderMark={renderMark}
                renderNode={renderNode}
              />
            </EditorStyles>
            <Button disabled={!title || !subject} onClick={() => updateText(_id)}>
              Save
            </Button>

            {/* if this is not place this in an anonymous function, it creates an error */}
            <Button onClick={() => toggleSingleEdit()}>
              Cancel
            </Button>
          </EditorInner>
        </EditorOuter>
      </OuterContainer>
    );
  }
}