import React, { PureComponent, Fragment } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import styled from "styled-components";
import { StoryboardCard } from "./StoryboardCard";
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

const SortableItem = SortableElement(props =>
  <StoryboardCard {...props} />
);

const SortableList = SortableContainer(props =>
  <Container>
    {props.texts.map((text, index) => {
      return (
        <SortableItem
          id={text._id}
          index={index}
          key={`item-${index}`}
          {...props}
          text={text}
        />
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
    console.log(this.props);
    return (
      <Fragment>
        <SortableList
          axis="xy"
          onSortEnd={this.onSortEnd}
          {...this.props}
        />
        <button onClick={() => this.props.toggleStoryboard()}>Close</button>
      </Fragment>
    );
  }
};
