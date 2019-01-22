import React, { Fragment, PureComponent } from 'react';
import { Link } from "react-router-dom";
import {
  SortableContainer,
  SortableElement,
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 280px) );
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
  padding: 0 50px 5px 0;
  width: 100%;
  a {
    color: #26d4cc;
    font-size: 1.8rem;
    margin: 3px 0 0 4px;
    text-decoration: underline;
    transition: ${props => props.theme.colorTrans}, text-shadow 0.15s ease-in-out;
    &:hover {
      color: #fff;
    }
  }
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
  text-align: center;
`;

const ModalH3 = styled.h3`
  font-size: 2rem;
  margin: 10px auto;
  max-width: 800px;
  text-align: center;
`;

const EditorStyle = styled.div`
  background: ${props => props.theme.editorBG};
  border: 2px solid ${props => props.theme.links};
  border-radius: 6px;
  box-shadow: ${props => props.theme.fieldShadow};
  color: ${props => props.theme.black};
  max-height: 300px;
  overflow: auto;
  padding: 20px;
  text-shadow: none;
  p {
    text-indent: 25px;
  }
`;

const NothingHeading = styled.h2`
  font-family: ${props => props.theme.hTypeface};
  font-size: 5rem;
  padding: 15px 50px 15px 0;
  text-align: center;
`;

const NothingToSeeHere = styled.h3`
  font-size: 2rem;
  padding-right: 50px;
  text-align: center;
`;

const SortableItem = SortableElement(props =>
  <StoryboardCard {...props} />
);

const SortableList = SortableContainer(props =>
  <Container>
    {props.texts.map((text, index) => (
      <SortableItem
        id={text._id}
        imageModal={props.imageModal}
        index={index}
        key={`item-${index}`}
        {...props}
        subject={props.subject}
        text={text}
        toggleCurrentText={props.toggleCurrentText}
        toggleSingleEdit={props.toggleSingleEdit}
        uploadImageModal={props.uploadImageModal}
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
          <EditorStyle>
            <Editor
              value={Value.fromJSON(JSON.parse(text.text))}
              renderMark={renderMark}
              renderNode={renderNode}
            />
          </EditorStyle>
        </Fragment>
      ),
      style: { maxHeight: '80vh', overflow: 'auto' },
      buttons: <button onClick={this.props.closeModal}>Close</button>
    })
  }

  render() {
    console.log(this.props);
    const { subject, theme, _id } = this.props.subject;
    const { texts } = this.props;
    return (
      <Fragment>
        <SubjectHeading>
          <Title title={theme}>Topic: {subject}</Title>
          <LinkBtn
            size="1.8rem"
            underline
            text
            // toggleStoryboard must be inside an anonymous function,
            // otherwise it throws an error thinking it's trying to reuse
            // the parameter that was passed to it when it was toggled on.
            onClick={() => this.props.toggleStoryboard()}
          >
            project overview
          </LinkBtn>
          <LinkBtn
            size="1.8rem"
            underline
            text
            // toggleStoryboard must be inside an anonymous function,
            // otherwise it throws an error thinking it's trying to reuse
            // the parameter that was passed to it when it was toggled on.
            onClick={() => this.props.toggleDragonText(_id)}
          >
            full text view
          </LinkBtn>

          <Link
            to={{
              pathname: "/print",
              state: { texts, subject: this.props.subject }
            }}
          >
            print view
          </Link>
        </SubjectHeading>

        {texts.length > 0
          ? (
            <SortableList
              axis="xy"
              imageModal={this.props.imageModal}
              onSortEnd={this.onSortEnd}
              subject={this.props.subject}
              texts={texts}
              toggleCurrentText={this.toggleCurrentText}
              toggleSingleEdit={this.props.toggleSingleEdit}
              uploadImageModal={this.props.uploadImageModal}
              useDragHandle={true}
            />
          ) : (
            <Fragment>
              <NothingHeading>Storyboard View</NothingHeading>
              <NothingToSeeHere>(You don't have any texts under this topic yet)</NothingToSeeHere>
            </Fragment>
          )
        }



      </Fragment>
    );
  }
};
