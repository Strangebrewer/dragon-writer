import React, { PureComponent, Fragment } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import styled from "styled-components";
import { Scales } from "../../utils";

const Container = styled.div`
  background: transparent;
  display: grid;
  height: 100%;
  grid-gap: 15px;
  grid-template-columns: repeat( auto-fit, minmax(200px, 280px) );
  grid-template-rows: minmax(200px, 280px);
  width: 100%;
  button {
    justify-self: end;
  }
`;

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
    h3, p {
      opacity: 1;
    }
  }
`;

const SortableItem = SortableElement(({ text }) =>
  <Card>
    <h3>{text.title}</h3>
    <p>{text.thesis}</p>
    <img src={text.image} />
  </Card>

);

const SortableList = SortableContainer(({ texts }) =>
  <Container>
    {texts.map((text, index) => {
      return (
        <SortableItem key={`item-${index}`} index={index} text={text} />
      )
    })}
  </Container>
);

export class Storyboard extends PureComponent {

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return;
    const { state, subject, texts } = this.props;
    const newArray = arrayMove(texts, oldIndex, newIndex);
    const newOrder = newArray.map(text => text._id);
    const newState = Scales.storyboardDragon(state, subject._id, newOrder);
    this.props.executeDragonStateChanges(newState);
  };

  render() {
    return (
      <Fragment>
        <SortableList texts={this.props.texts} onSortEnd={this.onSortEnd} axis="xy" />
        <button onClick={() => this.props.toggleStoryboard()}>Close</button>
      </Fragment>
    );
  }
};
