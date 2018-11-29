import React, { Component, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Editor } from "slate-react";
import { Value } from "slate";
import styled from 'styled-components';
import dateFns from "date-fns";
import { renderMark, renderNode } from "../slate/utils/Renderers";
import { LinkBtn, Modal } from "../Elements";
import { Button } from "../Forms/FormElements";

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 5px;
  padding: 6px 8px 4px 8px;
  transition: background-color .2s ease-in-out;
  box-shadow: ${props => props.theme.fieldShine};
  opacity: ${props => (
    props.dragging || props.loading
      ? "0.9"
      : "1"
  )};
  background: ${props => (
    props.isDragging
      ? props.theme.itemDragBG
      : props.theme.itemBG
  )};
  color: ${props => props.theme.itemColor};
  h4 {
    font-size: 1.8rem;
    font-weight: bold;
    padding-bottom: 2px;
  }
  p {
    font-size: 1.5rem;
    padding-left: 12px;
  }
`;

const ButtonDiv = styled.div`
  text-align: right;
  width: 30px;
`;

const TextDiv = styled.div`
  text-align: left;
  max-width: calc(100% - 30px);
`;

const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DateText = styled.h5`
    display: inline-block;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 8px;
`;

const ModalH2 = styled.h2`

`;

const ModalH3 = styled.h3`

`;

const ModalPg = styled.p`

`;

export class DragonItem extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: "",
      style: {}
    },
  };

  closeModal = () => {
    this.setState({
      modal: { isOpen: false }
    });
  };

  setModal = modalInput => {
    this.setState({
      modal: {
        isOpen: true,
        body: modalInput.body,
        buttons: modalInput.buttons,
        style: modalInput.style
      }
    });
  };

  outsideClick = event => {
    // the space in this is necessary because the outer div is the only one that will have a space after 'modal' in the classname.
    if (event.target.className.includes("modal "))
      this.closeModal();
  };

  deleteTextModal = (textId, subjectId, index) => {
    this.setModal({
      body: <p>Are you sure you want to delete? This is permenent.</p>,
      buttons: (
        <React.Fragment>
          <button onClick={() => this.props.deleteText(textId, subjectId, index)}>Yes, delete it</button>
          <button onClick={this.closeModal}>Cancel</button>
        </React.Fragment>
      )
    })
  };

  seeFullText = text => {
    console.log(text);
    this.setModal({
      body: (
        <Fragment>
          <ModalH2>{text.title}</ModalH2>
          <ModalH3>{text.thesis}</ModalH3>
          <Editor
            value={Value.fromJSON(JSON.parse(text.text))}
            renderMark={renderMark}
            renderNode={renderNode}
          />
        </Fragment>
      ),
      buttons: (
        <Button onClick={this.closeModal}>Close</Button>
      ),
      style: { maxHeight: '80vh', overflow: 'auto' }
    })
  }

  render() {
    const { index, text, subjectId } = this.props;
    return (
      <Fragment>
        <Modal
          style={this.state.modal.style}
          show={this.state.modal.isOpen}
          closeModal={this.closeModal}
          body={this.state.modal.body}
          buttons={this.state.modal.buttons}
          outsideClick={this.outsideClick}
        />
        <Draggable
          draggableId={text._id}
          index={index}
          isDragDisabled={this.props.loading}
        >
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              loading={this.props.loading}
              dragging={this.props.dragging}
              {...provided.dragHandleProps}
            >
              <LinkBtn
                onClick={() => this.seeFullText(text)}
                position="absolute"
                top="6px"
                right="24px"
                padding="0 0 10px 7px"
                black
                size="1rem"
                underline
              >
                <i className="far fa-eye"></i>
              </LinkBtn>

              <LinkBtn
                onClick={() => this.deleteTextModal(text._id, subjectId, index)}
                position="absolute"
                top="6px"
                right="8px"
                padding="0 0 10px 7px"
                delete
                black
                size="1rem"
                underline
              >
                <i className="fas fa-trash-alt"></i>
              </LinkBtn>


              <h4>{text.title}</h4>
              <p>{text.thesis}</p>

              <DateDiv>
                <DateText>
                  created: {dateFns.format(text.createdAt, "MMM DD, YYYY")}
                </DateText>

                <DateText>
                  modified: {dateFns.format(text.updatedAt, "MMM DD, YYYY")}
                </DateText>
              </DateDiv>
            </Container>
          )}
        </Draggable>
      </Fragment>

    );
  }
};