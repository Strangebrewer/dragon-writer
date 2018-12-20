import React, { PureComponent } from 'react';
import styled from "styled-components";
import { StoryboardButtons } from "../Dragons/DragonElements";

const Card = styled.div`
  background: ${props => props.theme.pageBGLite};
  border: 2px solid ${props => props.theme.mainColor};
  border-radius: 5px;
  display: flex;
  height: 280px;
  padding: 10px;
  position: relative;
  width: 280px;
  cursor: move;
  img {
    align-self: center;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
  }
  button {
    opacity: 0.1;
    transition: opacity .4s ease-in-out;
  }
  h3, p {
    color: ${props => props.theme.mainColor};
    font-weight: bold;
    margin: auto;
    opacity: 0.1;
    position: absolute;
    right: 0;
    left: 0;
    text-align: center;
    text-shadow: 0 0 1px ${props => props.theme.pageBG},
      0 0 2px ${props => props.theme.pageBG},
      0 0 5px ${props => props.theme.pageBG};
    transition: opacity .4s ease-in-out;
  }
  h3 {
    font-size: 3rem;
    top: 10px;
  }
  p {
    font-size: 2rem;
    bottom: 10px;
  }
  &:hover {
    h3, p, button {
      opacity: 1;
    }
  }
`;

export class StoryboardCard extends PureComponent {

  render() {
    return (
      <Card>
        <StoryboardButtons {...this.props} />
        <h3>{this.props.text.title}</h3>
        <p>{this.props.text.thesis}</p>
        <img src={this.props.text.image} />
      </Card>
    );
  }
};