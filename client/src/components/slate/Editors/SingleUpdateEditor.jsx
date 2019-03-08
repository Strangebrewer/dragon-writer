import React, { Component } from 'react';
import { Editor } from "slate-react";
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import { DragonColumnFake } from "../../Dragons";
import { StoryboardCardFake } from "../../Storyboard";
import {
  EditorWrapper,
  EditorStyles,
  Header,
  MetaDataForm,
  OuterContainer
} from "./Styles";

export const SingleUpdateEditor = props => {
  const { storyboardOn, texts, toggleSingleEdit, updateText } = props;
  const { subject, title } = props.state;
  const { _id } = props.text;
  return (
    <OuterContainer>
      {storyboardOn
        ? (
          <StoryboardCardFake
            text={props.text}
          />
        ) : (
          <DragonColumnFake
            subject={props.state.subject}
            texts={texts}
          />
        )}

      <EditorWrapper style={{ marginLeft: '20px' }}>
        <Header>
          <p>{props.state.title}</p>
        </Header>

        <MetaDataForm>
          <div>
            <Label>Title:</Label>
            <Input
              tabIndex="1"
              type="text"
              name="title"
              value={props.state.title}
              maxLength="20"
              placeholder="(20 char max)"
              onChange={props.handleInputChange}
            />
          </div>

          <div>
            <Label>Summary:</Label>
            <Input
              tabIndex="2"
              type="text"
              maxLength="140"
              name="thesis"
              value={props.state.thesis}
              placeholder="(140 char max)"
              onChange={props.handleInputChange}
            />
          </div>
        </MetaDataForm>


        <RenderButtons
          style={{
            background: '#ffffff87',
            border: '2px solid rgba(38, 212, 204, .5)',
            borderBottom: 'none'
          }}
          state={props.state}
          onClickBlock={props.onClickBlock}
          onClickLink={props.onClickLink}
          onClickMark={props.onClickMark}
          hasBlock={props.hasBlock}
          hasLinks={props.hasLinks}
          hasMark={props.hasMark}
        />

        <EditorStyles>
          <div>
            <Editor
              autoFocus
              plugins={plugins}
              ref={props.thisRef}
              value={props.state.value}
              onChange={props.onChange}
              onPaste={props.onPaste}
              renderMark={renderMark}
              renderNode={renderNode}
              tabIndex="3"
            />
          </div>
        </EditorStyles>

        <Button disabled={!title || !subject} onClick={() => updateText(_id)}>
          Save
        </Button>

        {/* if this is not place this in an anonymous function, it creates an error */}
        <Button onClick={() => toggleSingleEdit()}>
          Cancel
        </Button>
      </EditorWrapper>
    </OuterContainer>
  );
}