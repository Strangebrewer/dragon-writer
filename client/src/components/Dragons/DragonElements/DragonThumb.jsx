import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  padding: 10px;
  position: relative;
  margin: 10px;
  display: flex;
  /* box-shadow: 0 0 40px #fff; */
  background: rgba(22, 136, 130, 0.287);
  border-left: 1px solid rgb(18, 110, 106);
  border-top: 1px solid rgb(22, 136, 130);
  box-shadow: 2px 2px 4px rgb(0,0,0);
`;

const Image = styled.img`
  border: 1px dotted rgb(22, 136, 130);
  margin: auto;
  max-height: 100%;
  max-width: 100%;
  z-index: 2;
`;

const Textarea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  max-height: 100%;
  max-width: 100%;
  opacity: 0;
  z-index: 0;
`;

export const DragonThumb = props => {

  const copyToClipboard = () => {
    const el = document.getElementById(props.id)
    el.focus();
    el.select();
    document.execCommand('copy');
  }

  return (
    <ImageWrapper>
      <Textarea id={props.id} defaultValue={props.url} />
      <Image src={props.src} alt="" onClick={copyToClipboard} />
    </ImageWrapper>
  )
}