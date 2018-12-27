import React, { PureComponent } from 'react';
import styled from "styled-components";
import { SortableHandle } from 'react-sortable-hoc';
import { StoryboardButtons } from "../Dragons/DragonElements";

const DragHandle = SortableHandle(props => <h3>{props.children}</h3>)

const Card = styled.div`
  background: ${props => props.theme.pageBGLite};
  border: 1px solid ${props => props.theme.projectItemBG};
  border-radius: 5px;
  display: flex;
  height: 280px;
  padding: 10px;
  position: relative;
  width: 280px;
  img {
    align-self: center;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
  button {
    opacity: ${props => props.image ? 0.1 : 0.3};
    transition: opacity .4s ease-in-out;
  }
  button:disabled {
    opacity: 0.1;
  }
  h3, p {
    color: ${props => props.theme.mainColor};
    font-family: ${props => props.theme.hTypeface};
    font-weight: bold;
    margin: auto;
    opacity: 0.04;
    opacity: ${props => props.image ? 0.04 : 0.4};
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
    transition: opacity .4s ease-in-out;
  }
  h3 {
    cursor: grab;
    font-family: ${props => props.theme.hTypeface};
    font-size: 2.8rem;
    top: 10px;
  }
  h3:active {
    cursor: grabbing;
  }
  p {
    font-family: ${props => props.theme.typeface};
    font-size: 2rem;
    bottom: 10px;
  }
  &:hover {
    h3, p, button, .fa-arrows-alt {
      opacity: 1;
    }
    button:disabled {
      opacity: 0.6;
    }
    border: 1px solid ${props => props.theme.midGrey};
  }
`;

export class StoryboardCard extends PureComponent {

  render() {
    console.log(this.props);
    return (
      <Card image={this.props.text.image}>
        <StoryboardButtons {...this.props} />
        <DragHandle>{this.props.text.title}</DragHandle>
        <p>{this.props.text.thesis}</p>
        <img src={this.props.text.image} />
      </Card>
    );
  }
};