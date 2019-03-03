import React, { Component } from 'react';
import { Editor } from "slate-react";
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import { DragonColumnFake } from "../../Dragons";
import { StoryboardCardFake } from "../../Storyboard";
import {
  EditorInner,
  EditorOuter,
  EditorStyles,
  Header,
  MetaDataForm,
  OuterContainer
} from "./Styles";

const addedStyles = {
  marginLeft: "20px",
  marginRight: "200px"
}

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

      <EditorOuter style={addedStyles}>
        <Header>
          <p>Edit: &nbsp;{props.state.title}</p>
        </Header>

        <EditorInner>
          <MetaDataForm>
            <div>
              <Label>Title:</Label>
              <Input
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
            style={{ paddingLeft: "5px", marginBottom: '2px' }}
            state={props.state}
            onClickBlock={props.onClickBlock}
            onClickLink={props.onClickLink}
            onClickMark={props.onClickMark}
            hasBlock={props.hasBlock}
            hasLinks={props.hasLinks}
            hasMark={props.hasMark}
          />

          <EditorStyles style={{ maxHeight: "35vh" }}>
            <Editor
              autoFocus
              plugins={plugins}
              ref={props.thisRef}
              value={props.state.value}
              onChange={props.onChange}
              onPaste={props.onPaste}
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