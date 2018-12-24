import React, { Component } from 'react';
import styled from 'styled-components';
import { Editor } from "slate-react";
import { Value } from "slate";
import { renderMark, renderNode } from "../components/slate/utils/Renderers";
import { EditorStyles } from "../components/slate/utils/EditorStyles";

const Container = styled.div`
  width: 800px;
  margin: auto;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

class Print extends Component {
  render() {
    const { subject, texts } = this.props.location.state;
    console.log(this.props);
    return (
      <Container>
        <Heading onClick={this.props.history.goBack}>{subject.subject}</Heading>
        <EditorStyles mode="read" print>
          {texts.map((text, index) => (
            <Editor
              key={text._id}
              index={index}
              value={Value.fromJSON(JSON.parse(text.text))}
              readOnly
              renderMark={renderMark}
              renderNode={renderNode}
            />
          ))}
        </EditorStyles>
      </Container>
    );
  }
}

export default Print;