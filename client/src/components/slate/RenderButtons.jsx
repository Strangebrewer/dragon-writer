import React, { Component } from 'react';
import styled from 'styled-components';

const EditorBtnArray = styled.div`
  cursor: default;
  margin: 5px 0 0 0;  
  margin-left: ${props => props.inline && '250px'};
  padding-top: 10px;
  text-align: left;
  button span {
    font-family: 'Times New Roman', Times, serif;
    font-size: ${props => (
      props.inline
        ? "1rem"
        : "1.6rem"
    )};
    font-weight: bold;
    line-height: 0.5;
    margin: 0;
    padding: 0;
  }
`;

const EditorBtn = styled.button`
  cursor: pointer;
  font-size: ${props => (
    props.inline
      ? "1rem"
      : "1.6rem"
  )};
  height: ${props => (
    props.inline
      ? "30px"
      : "40px"
  )};
  margin: 0 5px 5px 0;
  opacity: ${props => (
    props.isActive
      ? 1
      : 0.6
  )};
  padding: 0;
  width: ${props => (
    props.inline
      ? "30px"
      : "40px"
  )};
  &:last-of-type {
    margin-right: 0;
  }
`;

class RenderButtons extends Component {

  renderMarkButton = (type, icon) => {
    const isActive = this.props.hasMark(type);
    let color;
    if (type === 'red') color = '#bd0000';
    if (type === 'blue') color = '#1111ff';
    if (type === 'green') color = '#39ff14';
    if (type === 'yellow') color = '#fffb00';
    if (type === 'purple') color = '#660d8a';

    return (
      <EditorBtn
        inline={this.props.inline}
        isActive={isActive}
        style={{ color }}
        key={`icon-${type}`}
        onClick={() => this.props.onClickMark(type)}
      >
        <i className={`fas fa-${icon}`} />
      </EditorBtn>
    )
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.props.hasBlock(type);
    let span;
    if (type.includes('one')) span = <span>&nbsp;1</span>;
    if (type.includes('two')) span = <span>&nbsp;2</span>;
    if (type.includes('three')) span = <span>&nbsp;3</span>;

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.props.state;
      let parent;
      if (value.blocks.first())
        parent = value.document.getParent(value.blocks.first().key);
      isActive = this.props.hasBlock('list-item') && parent && parent.type === type;
    }

    return (
      <EditorBtn
        inline={this.props.inline}
        isActive={isActive}
        key={`icon-${type}`}
        onClick={() => this.props.onClickBlock(type)}
      >
        <i className={`fas fa-${icon}`} />
        {span}
      </EditorBtn>
    )
  };

  render() {
    return (
      <EditorBtnArray inline={this.props.inline}>
        {this.renderMarkButton('bold', 'bold')}
        {this.renderMarkButton('italic', 'italic')}
        {this.renderMarkButton('underline', 'underline')}
        {this.renderMarkButton('red', 'palette')}
        {this.renderMarkButton('blue', 'palette')}
        {this.renderMarkButton('yellow', 'palette')}
        {this.renderMarkButton('green', 'palette')}
        {this.renderMarkButton('purple', 'palette')}
        {this.renderMarkButton('strikethrough', 'strikethrough')}
        {this.renderMarkButton('code', 'code')}
        {this.renderBlockButton('heading-one', 'heading')}
        {this.renderBlockButton('heading-two', 'heading')}
        {this.renderBlockButton('heading-three', 'heading')}
        {this.renderBlockButton('block-quote', 'quote-right')}
        {this.renderBlockButton('numbered-list', 'list-ol')}
        {this.renderBlockButton('bulleted-list', 'list-ul')}
        {this.renderMarkButton('link', 'link')}
      </EditorBtnArray>
    );
  }
}

export default RenderButtons;