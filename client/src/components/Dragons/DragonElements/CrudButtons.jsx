import React from "react";
import styled from 'styled-components';
import { LinkBtn } from "../../Elements";

const Buttons = styled.div`
  position: absolute;
  top: 6px;
  left: 8px;
  display: flex;
  justify-content: space-between;
`;

export const CRUDButtons = props => (
  <Buttons>
    <LinkBtn
      title={`create new item for ${props.subject.subject} column`}
      padding="0 3px 5px 3px"
      onClick={() => props.toggleEditor(props.subject)}
    >
      <i className="far fa-file-alt"></i>
    </LinkBtn>

    <LinkBtn
      title="expand column to read all full texts"
      padding="0 3px 5px 3px"
      onClick={() => props.dragonTextOn(props.id)}
    >
      <i className="far fa-eye"></i>
    </LinkBtn>

    <LinkBtn
      title="update column name"
      padding="0 3px 5px 3px"
      onClick={() => props.updateSubjectModal(props.subject)}
    >
      <i className="fas fa-edit"></i>
    </LinkBtn>

    <LinkBtn
      title="delete this column"
      padding="0 3px 5px 3px"
      delete
      onClick={() => props.deleteSubjectModal(props.id, props.index)}
    >
      <i className="fas fa-trash-alt"></i>
    </LinkBtn>
  </Buttons>
);