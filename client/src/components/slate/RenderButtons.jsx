import React from 'react';
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

const RenderButtons = props => {

  const renderMarkButton = (type, icon) => {
    const isActive = props.hasMark(type);
    let color;
    if (type === 'red') color = '#bd0000';
    if (type === 'blue') color = '#1111ff';
    if (type === 'green') color = '#39ff14';
    if (type === 'yellow') color = '#fffb00';
    if (type === 'purple') color = '#660d8a';

    return (
      <EditorBtn
        inline={props.inline}
        isActive={isActive}
        style={{ color }}
        key={`icon-${type}`}
        onClick={() => props.onClickMark(type)}
      >
        <i className={`fas fa-${icon}`} />
      </EditorBtn>
    )
  };

  const renderBlockButton = (type, icon) => {
    let isActive = props.hasBlock(type);
    let span;
    if (type.includes('one')) span = <span>&nbsp;1</span>;
    if (type.includes('two')) span = <span>&nbsp;2</span>;
    if (type.includes('three')) span = <span>&nbsp;3</span>;

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = props.state;
      let parent;
      if (value.blocks.first())
        parent = value.document.getParent(value.blocks.first().key);
      isActive = props.hasBlock('list-item') && parent && parent.type === type;
    }

    return (
      <EditorBtn
        inline={props.inline}
        isActive={isActive}
        key={`icon-${type}`}
        onClick={() => props.onClickBlock(type)}
      >
        <i className={`fas fa-${icon}`} />
        {span}
      </EditorBtn>
    )
  };

  return (
    <EditorBtnArray inline={props.inline} style={props.style}>
      {renderMarkButton('bold', 'bold')}
      {renderMarkButton('italic', 'italic')}
      {renderMarkButton('underline', 'underline')}
      {renderMarkButton('red', 'palette')}
      {renderMarkButton('blue', 'palette')}
      {renderMarkButton('yellow', 'palette')}
      {renderMarkButton('green', 'palette')}
      {renderMarkButton('purple', 'palette')}
      {renderMarkButton('strikethrough', 'strikethrough')}
      {renderMarkButton('code', 'code')}
      {renderBlockButton('heading-one', 'heading')}
      {renderBlockButton('heading-two', 'heading')}
      {renderBlockButton('heading-three', 'heading')}
      {renderBlockButton('block-quote', 'quote-right')}
      {renderBlockButton('numbered-list', 'list-ol')}
      {renderBlockButton('bulleted-list', 'list-ul')}
      {renderMarkButton('link', 'link')}
    </EditorBtnArray>
  );
}

export default RenderButtons;