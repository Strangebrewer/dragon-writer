import React from "react";
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";
import { Spinner } from "../../Styles";

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 4px;
  right: 8px;
`;

export const ItemButtons = React.memo(props => {
  const { id, index, subject, text } = props;
  const { image, publicId } = text;
  const size = "1.1rem"
  return (
    props.loading
      ? <Spinner top="6px" right="38px" size="10px" black />
      : (
        <Buttons>
          <LinkBtn
            disabled={props.disabled}
            onClick={() => props.seeFullText(text)}
            padding="0 2px 10px 3px"
            size={size}
            title={!props.disabled ? "see full text" : null}
          >
            <i className="far fa-eye"></i>
          </LinkBtn>

          <LinkBtn
            disabled={props.disabled}
            onClick={() => props.toggleSingleEdit(subject, text)}
            padding="0 2px 10px 3px"
            size={size}
            title={!props.disabled ? "edit text" : null}
          >
            <i className="fas fa-edit"></i>
          </LinkBtn>

          <LinkBtn
            disabled={props.disabled || image}
            onClick={() => props.uploadImageModal(id)}
            padding="0 2px 10px 3px"
            size={size}
            title={!props.disabled
              ? (
                image
                  ? "you must delete the current image before uploading another"
                  : "upload image for this text"
              ) : null}
          >
            <i className="fas fa-upload"></i>
          </LinkBtn>

          <LinkBtn
            disabled={props.disabled || !image}
            onClick={() => props.imageModal(image, publicId, id, "text")}
            padding="0 2px 10px 3px"
            size={size}
            title={!props.disabled
              ? (
                image
                  ? "see image for this text"
                  : "no image has been uploaded for this text"
              ) : null}
          >
            <i className="far fa-images"></i>
          </LinkBtn>

          <LinkBtn
            delete
            disabled={props.disabled}
            onClick={() => props.deleteTextModal(text._id, subject._id, index)}
            padding="0 2px 10px 3px"
            size={size}
            title={!props.disabled ? `delete ${text.title}` : null}
          >
            <i className="fas fa-trash-alt"></i>
          </LinkBtn>
        </Buttons>
      )
  );
});