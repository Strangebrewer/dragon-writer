import React from "react";
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";

const Buttons = styled.div`
  position: absolute;
  top: 6px;
  left: 8px;
  display: flex;
  justify-content: space-between;
`;

export const ColumnButtons = props => (
  <React.Fragment>
    <Buttons>
      <LinkBtn
        title={`create new item for ${props.subject.subject} column`}
        padding="0 3px 5px 3px"
        disabled={props.disabled}
        onClick={() => props.toggleInlineNew(props.subject)}
      >
        <i className="far fa-file-alt"></i>
      </LinkBtn>

      <LinkBtn
        title="expand column to read all full texts"
        padding="0 3px 5px 3px"
        disabled={props.disabled}
        onClick={() => props.dragonTextOn(props.id)}
      >
        <i className="far fa-eye"></i>
      </LinkBtn>

      <LinkBtn
        title="update column name"
        padding="0 3px 5px 3px"
        disabled={props.disabled}
        onClick={() => props.updateSubjectModal(props.subject)}
      >
        <i className="fas fa-edit"></i>
      </LinkBtn>

      <LinkBtn
        title="delete this column"
        padding="0 3px 5px 3px"
        disabled={props.disabled}
        delete
        onClick={() => props.deleteSubjectModal(props.id, props.index)}
      >
        <i className="fas fa-trash-alt"></i>
      </LinkBtn>
    </Buttons>
    <LinkBtn
      title="close this column"
      position="absolute"
      top="2px"
      right="3px"
      padding="0 4px 5px 0"
      size="2rem"
      disabled={props.disabled}
      onClick={() => props.toggleSubject(props.id)}
    >
      &times;
    </LinkBtn>
  </React.Fragment>

);