import React, { PureComponent } from 'react';
import styled from "styled-components";

const Card = styled.div`
  background: rgba(255, 255, 255, 0.333);
  border-radius: 2px;
  box-shadow: 0 0 1px #26d4cc,
    0 0 2px #26d4cc,
    0 0 3px #26d4cc,
    0 0 4px #26d4cc,
    0 0 5px #26d4cc,
    0 0 10px #26d4cc,
    0 0 20px #26d4cc;
  display: flex;
  height: 280px;
  min-height: 280px;
  margin: 84px 20px 0 30px;
  padding: 10px;
  position: relative;
  min-width: 280px;
  width: 280px;
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

export const StoryboardCardFake = props => {
  const { image, thesis, title } = props.text;
  return (
    <Card image={image}>
      <h3>{title}</h3>
      <p>{thesis}</p>
      {image && <img src={image} />}
    </Card>
  );
};