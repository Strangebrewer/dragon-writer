import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Editor } from "slate-react";
import { Value } from "slate";
import { renderMark, renderNode } from "../components/slate/utils/Renderers";
import { LinkBtn } from "../components/PageElements";

const Container = styled.div`
  background: #fff;
  margin: auto;
  width: 800px;
  @media print {
    .print-nav {
      display: none;
    }
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

const PrintNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 5px auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  width: 150px;
  /* button {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  } */
`;

const EditorStyles = styled.div`
  font-family: 'Times New Roman', Times, serif;
  line-height: 1.4;
  overflow: auto;
  transition: background-color .2s ease-in-out;
  p {
    font-size: 1.2rem;
    margin: 0;
    text-indent: 25px;
  }
  ul {
    margin-top: 0;
    padding-top: 0;
  }
`;

class Print extends Component {
  render() {
    const { subject, texts } = this.props.location.state;
    console.log(this.props);
    return (
      <Fragment>
        <Container>
          <PrintNav className="print-nav">
            <LinkBtn onClick={this.props.history.goBack} title="go back" size="1rem" color="#2c9c97">
              <i className="fas fa-arrow-left" />
            </LinkBtn>
            <LinkBtn onClick={window.print} title="print page" size="1rem" color="#2c9c97">
              <i className="fas fa-print"></i>
            </LinkBtn>
          </PrintNav>
          <Heading>{subject.subject}</Heading>
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
      </Fragment>

    );
  }
}

export default Print;