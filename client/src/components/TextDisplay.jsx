import React, { Component, Fragment } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import { renderMark, renderNode } from "./slate/utils/Renderers";
import TextEditor from "./TextEditor";
import API from '../utils/API';

const TextColumn = styled.div`
  width: 600px;
  margin: auto;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 8px;
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 5px 0;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 8px;
`;

const TextTitle = styled.h3`
  font-size: 2.5rem;
  line-height: 1;
  font-weight: bold;
  margin: 0;
`;

const LinkBtn = styled.button`
  background: transparent;
  border: none;
  outline: transparent;
  color: ${props => props.theme.secondary};
  padding: 0 10px 0 0;
  text-decoration: underline;
  cursor: pointer;
`;

class TextDisplay extends Component {
  render() {
    console.log(this.props.texts)
    return (
      <Fragment>        
        <TextColumn>
          {this.props.texts.map(text => (
            this.props.state[text._id]
              ? (
                <TextEditor
                  key={text._id}
                  id={text._id}
                  subject={text.subjectId}
                  text={JSON.parse(text.text)}
                  title={text.title}
                  toggleEdit={this.props.toggleEdit}
                  getProjects={this.props.getProjects}
                  getSubjects={this.props.getSubjects}
                />
              ) : (
                <TextContainer key={text._id}>
                  <TextTitle>{text.title}</TextTitle>

                  <LinkBtn
                    onClick={() => this.props.toggleEdit(text._id)}>edit</LinkBtn>
                  <LinkBtn
                    onClick={() => this.props.deleteText(text._id)}>delete</LinkBtn>

                  <Editor
                    key={text._id}
                    value={Value.fromJSON(JSON.parse(text.text))}
                    readOnly
                    renderMark={renderMark}
                    renderNode={renderNode}
                  />
                </TextContainer>
              )
          ))}
        </TextColumn>

        
      </Fragment>
    );
  }
}

export default TextDisplay;