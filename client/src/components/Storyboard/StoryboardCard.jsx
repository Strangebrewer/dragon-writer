import React, { PureComponent } from 'react';
import styled from "styled-components";
import { SortableHandle } from 'react-sortable-hoc';
import { StoryboardButtons } from "../Dragons/DragonElements";

const DragHandle = SortableHandle(props => <h3>{props.children}</h3>)

const Card = styled.div`
  background: rgba(255, 255, 255, 0.333);
  border-radius: 2px;
  display: flex;
  height: 260px;
  margin: 0 10px 10px 10px;
  padding: 10px;
  position: relative;
  width: 260px;
  img {
    align-self: center;
    border: 1px solid black;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
  button {
    opacity: ${props => props.image ? 0.1 : 0.3};
    transition: opacity .2s ease-in-out;
  }
  button:disabled {
    opacity: 0.1;
  }
  h3, p {
    color: ${props => props.theme.mainColor};
    font-family: ${props => props.theme.hTypeface};
    margin: auto;
    opacity: 0.4;
    padding: 0 35px;
    position: absolute;
    right: 0;
    left: 0;
    text-align: center;
    text-shadow: 0 0 1px ${props => props.theme.pageBG},
      0 0 2px ${props => props.theme.pageBG},
      0 0 3px ${props => props.theme.pageBG},
      0 0 4px ${props => props.theme.pageBG},
      0 0 5px ${props => props.theme.pageBG},
      0 0 10px ${props => props.theme.black},
      0 0 15px ${props => props.theme.black},
      0 0 25px ${props => props.theme.black};
    transition: opacity .2s ease-in-out;
  }
  h3 {
    cursor: grab;
    font-family: ${props => props.theme.hTypeface};
    font-size: 2.8rem;
    font-weight: bold;
    top: 10px;
  }
  h3:active {
    cursor: grabbing;
  }
  p {
    bottom: 10px;
    font-family: ${props => props.theme.typeface};
    font-size: 1.5rem;
  }
  &:hover {
    h3, p, button, .fa-arrows-alt {
      opacity: 1;
    }
    button:disabled {
      opacity: 0.6;
    }
  }
`;

const CopyText = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 0;
`;

export const StoryboardCard = React.memo(props => {

  const copyImageAddress = () => {
    const el = document.getElementById(`img-copy-${props.id}`);
    el.focus();
    el.select();
    document.execCommand('copy');
  }

  const { image, thesis, title } = props.text;
  console.log(props);
  return (
    <Card image={image}>
      <CopyText id={`img-copy-${props.id}`} defaultValue={image} />
      <StoryboardButtons {...props} />
      <DragHandle>{title}</DragHandle>
      <p>{thesis}</p>
      {image && <img src={image} onClick={copyImageAddress} />}
    </Card>
  );
});

// export this component to re-use in the fake Storyboard Card
export {
  Card
}