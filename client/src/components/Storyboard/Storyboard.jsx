import React, { Fragment } from 'react';
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
  background: transparent;
  border: 1px solid black;
  display: flex;
  height: 280px;
  width: 280px;
  cursor: move;
  button {
    align-self: flex-start;
  }
  img {
    align-self: center;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
`;

const SortableItem = SortableElement(({ value }) =>
  <Card>
    <img src={value.image} />
  </Card>

);

const SortableList = SortableContainer(({ items }) =>
  <Container>
    {items.map((value, index) => {
      return (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      )
    })}
  </Container>
);

export const Storyboard = props => {

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return;
    const { state, subject, texts } = props;
    const newArray = arrayMove(texts, oldIndex, newIndex);
    const newOrder = newArray.map(text => text._id);
    const newState = Scales.storyboardDragon(state, subject._id, newOrder);
    props.executeDragonStateChanges(newState);
  };

  return (
    <Fragment>
      <SortableList items={props.texts} onSortEnd={onSortEnd} axis="xy" />
      <button onClick={() => props.toggleStoryboard()}>Close</button>
    </Fragment>
  );
};
