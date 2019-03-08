import React from 'react';
import { Editor } from "slate-react";
import { plugins } from "../utils/HotKeys";
import { renderMark, renderNode } from "../utils/Renderers";
import { Button, Input, Label } from "../../Forms/FormElements";
import RenderButtons from "../RenderButtons.jsx";
import { DragonColumnFake } from "../../Dragons";
import {
  EditorWrapper,
  EditorStyles,
  Header,
  MetaDataForm,
  OuterContainer
} from "./Styles";

const addedEdOuterStyles = {
  marginLeft: "20px"
}

export const InlineNewEditor = props => {
  const { createText, texts, toggleInlineNew } = props;
  const { subject, title } = props.state;
  console.log(props);
  return (
    <OuterContainer>
      <DragonColumnFake
        subject={props.state.subject}
        texts={texts}
      />

      <EditorWrapper style={addedEdOuterStyles}>
        <Header>
          <p>New text for: &nbsp;{subject.subject}</p>
        </Header>

        {/* <EditorInner> */}
          <MetaDataForm>
            <div>
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
            </div>

            <div>
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
        {/* </EditorInner> */}
      </EditorWrapper>
    </OuterContainer>
  );
};