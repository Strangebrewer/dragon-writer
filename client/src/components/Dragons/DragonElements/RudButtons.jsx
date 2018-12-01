import React from "react";
import styled from 'styled-components';
import { LinkBtn } from "../../Elements";

const Buttons = styled.div`
  position: absolute;
  top: 6px;
  right: 8px;
  display: flex;
  justify-content: space-between;
`;

export const RUDButtons = props => {
  const { text, subject, index } = props;
  return (
    <Buttons>
      <LinkBtn
        onClick={() => props.seeFullText(props.text)}
        padding="0 2px 10px 3px"
        black
        size="1rem"
        underline
        title="see full text"
      >
        <i className="far fa-eye"></i>
      </LinkBtn>

      <LinkBtn
        onClick={() => props.toggleEditor(props.text)}
        padding="0 2px 10px 3px"
        black
        size="1rem"
        underline
        title="edit text"
      >
        <i className="fas fa-edit"></i>
      </LinkBtn>

      <LinkBtn
        onClick={() => props.deleteTextModal(text._id, subject._id, index)}
        padding="0 2px 10px 3px"
        delete
        black
        size="1rem"
        underline
        title={`delete ${text.title}`}
      >
        <i className="fas fa-trash-alt"></i>
      </LinkBtn>
    </Buttons>

  );
}