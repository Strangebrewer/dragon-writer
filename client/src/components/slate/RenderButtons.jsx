import React from 'react';
import styled from 'styled-components';

const EditorBtnArray = styled.div`
  cursor: default;
  margin: 0px 0 0 0;
  opacity: .1;
  padding: 10px 0 6px 12%;
  padding-left: ${props => props.inline && '15px'};
  padding-top: ${props => props.inline && '0px'};
  position: ${props => props.inline && 'absolute'};
  text-align: left;
  /* transform: translateY(-20px); */
  transition: opacity .6s ease-in-out 0.8s;
  &:hover {
    opacity: 1;
    /* transform: translateY(0px); */
    transition: opacity 0.23s ease-in-out;
  }
  button span {
    font-family: 'Times New Roman', Times, serif;
    font-size: 1rem;
    font-weight: bold;
    line-height: 0.5;
    margin: 0;
    padding: 0;
  }
`;

const EditorBtn = styled.button`
  box-shadow: 2px 2px 1px #222;
  cursor: pointer;
  font-size: 1rem;
  height: 30px;
  margin: 0 5px 0 0;
  opacity: ${props => props.isActive ? 1 : 0.6};
  padding: 0;
  width: 30px;
  &:last-of-type {
    margin-right: 0;
  }
  &:active {
    box-shadow: 1px 1px 1px #222;
    transform: translateY(1px);
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

  const renderLinkButton = (type, icon) => {
    let isActive = props.hasLinks();
    return (
      <EditorBtn
        inline={props.inline}
        isActive={isActive}
        key={`icon-${type}`}
        onClick={props.onClickLink}
      >
        <i className={`fas fa-${icon}`} />
      </EditorBtn>
    )
  }

  const renderImageLeftButton = (type, icon) => {
    return (
      <EditorBtn
        inline={props.inline}
        onClick={props.onClickImageLeft}
      >
        <i className="fas fa-arrow-left" /><i className={`far fa-image`} />
      </EditorBtn>
    )
  }

  const renderImageRightButton = (type, icon) => {
    return (
      <EditorBtn
        inline={props.inline}
        onClick={props.onClickImageRight}
      >
        <i className={`far fa-image`} /><i className="fas fa-arrow-right" />
      </EditorBtn>
    )
  }

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
      {renderLinkButton('link', 'link')}
      {renderImageLeftButton('image-left')}
      {renderImageRightButton('image-right')}
    </EditorBtnArray>
  );
}

export default RenderButtons;