import React, { Fragment, PureComponent } from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from 'react-sortable-hoc';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from "styled-components";
import { StoryboardCard } from "./StoryboardCard";
import { renderMark, renderNode } from "../slate/utils/Renderers";
import { LinkBtn } from "../PageElements";
import { Scales } from "../../utils";

const Container = styled.div`
  background: transparent;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat( auto-fit, minmax(200px, 280px) );
  grid-template-rows: minmax(200px, 280px);
  padding: 10px 30px;
  width: 100%;
  button {
    justify-self: end;
  }
`;

const SubjectHeading = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 5px;
  width: 100%;
`;

const Title = styled.h3`
  color: ${props => props.theme.titleColor};
  font-family: ${props => props.theme.hTypeface};
  font-size: 3.5rem;
  padding-bottom: 10px;
  text-align: center;
  width: 100%;
`;

const ModalH2 = styled.h2`
  font-family: ${props => props.theme.hTypeface};
  font-size: 3.5rem;
`;

const ModalH3 = styled.h3`
  font-size: 2rem;
  margin-bottom: 10px;
  margin-top: 4px;
  text-indent: 30px;
`;

const editorStyle = {
  border: "1px solid #d8d8d8",
  maxHeight: "300px",
  overflow: "auto",
  padding: "20px",
}

const SortableItem = SortableElement(props =>
  <StoryboardCard {...props} />
);

const SortableList = SortableContainer(props =>
  <Container>
    {props.texts.map((text, index) => (
      <SortableItem
        id={text._id}
        index={index}
        key={`item-${index}`}
        {...props}
        text={text}
      />
    ))}
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

  toggleCurrentText = text => {
    this.props.setModal({
      body: (
        <Fragment>
          <ModalH2>{text.title}</ModalH2>
          <ModalH3>{text.thesis}</ModalH3>
          <Editor
            value={Value.fromJSON(JSON.parse(text.text))}
            renderMark={renderMark}
            renderNode={renderNode}
            style={editorStyle}
          />
        </Fragment>
      ),
      style: { maxWidth: '600px' },
      buttons: <button onClick={this.props.closeModal}>Close</button>
    })
  }

  render() {
    console.log(this.props);
    const { subject, theme, _id } = this.props.subject;
    return (
      <Fragment>
        <SubjectHeading>
          <Title title={theme}>Topic: {subject}</Title>
          <LinkBtn
            fancy
            size="1.8rem"
            underline
            // toggleStoryboard must be inside an anonymous function,
            // otherwise it throws an error thinking it's trying to reuse
            // the parameter that was passed to it when it was toggled on.
            onClick={() => this.props.toggleStoryboard()}
          >
            project overview
          </LinkBtn>
          <LinkBtn
            fancy
            size="1.8rem"
            underline
            // toggleStoryboard must be inside an anonymous function,
            // otherwise it throws an error thinking it's trying to reuse
            // the parameter that was passed to it when it was toggled on.
            onClick={() => this.props.toggleDragonText(_id)}
          >
            full text view
          </LinkBtn>
        </SubjectHeading>

        <SortableList
          axis="xy"
          deleteText={this.deleteText}
          deleteTextModal={this.deleteTextModal}
          onSortEnd={this.onSortEnd}
          toggleCurrentText={this.toggleCurrentText}
          toggleSingleEdit={this.props.toggleSingleEdit}
          useDragHandle={true}
          {...this.props}
        />

      </Fragment>
    );
  }
};
