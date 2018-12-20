import React, { Component } from 'react';
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";
import { Spinner } from "../../Styles";

const Buttons = styled.div`
  position: absolute;
  top: 10px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

class StoryboardButtons extends Component {
  render() {
    const { props } = this;
    const { text, subject, id, index } = props;
    const { image, largeImage, publicId } = text;
    return (
      props.loading
        ? <Spinner top="6px" right="38px" size="10px" black />
        : (
          <Buttons>
            <LinkBtn
              // onClick={() => props.seeFullText(text)}
              disabled={props.disabled}
              padding="0 2px 10px 3px"
              black
              size="1rem"
              underline
              title="see full text"
            >
              <i className="far fa-eye"></i>
            </LinkBtn>

            <LinkBtn
              // onClick={() => props.toggleSingleEdit(subject, text)}
              disabled={props.disabled}
              padding="0 2px 10px 3px"
              black
              size="1rem"
              underline
              title="edit text"
            >
              <i className="fas fa-edit"></i>
            </LinkBtn>

            <LinkBtn
              padding="0 2px 10px 3px"
              black
              underline
              size="1rem"
              disabled={props.disabled || text.image}
              onClick={() => props.uploadImageModal(id)}
              title={text.image ? "you must delete the current image before uploading another" : "upload project image"}
            >
              <i className="fas fa-upload"></i>
            </LinkBtn>

            <LinkBtn
              padding="0 2px 10px 3px"
              black
              underline
              size="1rem"
              disabled={props.disabled}
              onClick={() => props.imageModal(largeImage, publicId, id, "item")}
              title="see project image"
            >
              <i className="far fa-images"></i>
            </LinkBtn>

            <LinkBtn
              onClick={() => props.deleteTextModal(text._id, subject._id, index)}
              disabled={props.disabled}
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
        )
    );
  }
}

export default StoryboardButtons;