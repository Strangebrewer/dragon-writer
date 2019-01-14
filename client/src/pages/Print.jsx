import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Editor } from "slate-react";
import { Value } from "slate";
import { renderMark, renderNode } from "../components/slate/utils/Renderers";
import { LinkBtn } from "../components/PageElements";
import { GlobalStyle } from "../components/Styles";

const Wrapper = styled.div`
  background: #fff;
  font-family: 'Times New Roman', Times, serif;
  /* min-height: 100vh; */
  width: 100%; 
`;

const Container = styled.div`
  margin: auto;
  padding: 85px 0;
  width: 800px;
  @media print {
    .do-not-print {
      display: none;
    }
  }
`;

const Heading = styled.h2`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const PrintNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 15px auto 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  width: 120px;
  button {
    background: #ebebeb;
    border: 1px solid #dfdfdf;
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }
`;

const PrintWarning = styled.p`
  background: white;
  border: 1px solid #454545;
  border-radius: 2px;
  box-shadow: 2px 2px 2px #888;
  color: #393939;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.3rem;
  opacity: 0;
  margin: auto;
  padding: 5px;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  text-align: center;
  transition: opacity 0.2s ease-in-out;
  z-index: 3;
`;

const EditorStyles = styled.div`
  line-height: 1.4;
  overflow: auto;
  transition: background-color .2s ease-in-out;
  p {
    font-size: 2rem;
    margin: 0;
    text-indent: 25px;
  }
  ul {
    margin-top: 0;
    padding-top: 0;
  }
`;

class Print extends Component {
  state = {
    tooltip: '',
    tooltipStyle: {}
  }

  showTooltip = type => {
    this.setState({
      tooltip: type === "arrow" ? "go back" : "when you print, select 'Print to PDF'",
      tooltipStyle: {
        opacity: 1,
        transform: type === "arrow" ? "translateX(-20px)" : "translateX(140px)",
        width: type === "arrow" ? "80px" : "235px"
      }
    })
  }

  hideTooltip = type => {
    this.setState({
      tooltipStyle: {
        ...this.state.tooltipStyle,
        opacity: 0
      }
    });
  }

  print = () => {
    window.print();
    this.hideTooltip();
  }

  render() {
    const { subject, texts } = this.props.location.state;
    console.log(this.props);
    return (
      <Wrapper>
        <GlobalStyle />
        <Container>
          <PrintNav className="do-not-print">
            <LinkBtn
              onClick={this.props.history.goBack}
              onMouseOver={() => this.showTooltip("arrow")}
              onMouseLeave={this.hideTooltip}
              size="1.5rem"
              color="#2c9c97"
            >
              <i className="fas fa-arrow-left" />
            </LinkBtn>
            <LinkBtn
              onClick={this.print}
              onMouseOver={this.showTooltip}
              onMouseLeave={this.hideTooltip}
              size="1.5rem"
              color="#2c9c97"
            >
              <i className="fas fa-print"></i>
            </LinkBtn>
          </PrintNav>
          <PrintWarning className="do-not-print" style={this.state.tooltipStyle}>{this.state.tooltip}</PrintWarning>
          <Heading>{subject.subject}</Heading>
          <EditorStyles>
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
      </Wrapper>
    );
  }
}

export default Print;