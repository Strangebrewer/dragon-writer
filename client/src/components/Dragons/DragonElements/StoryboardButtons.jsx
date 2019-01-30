import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";
import { Spinner } from "../../Styles";

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 3px;
  button {
    text-shadow: 0 0 1px ${props => props.theme.pageBG},
      0 0 2px ${props => props.theme.pageBG},
      0 0 5px ${props => props.theme.pageBG};
  }
`;

export class StoryboardButtons extends PureComponent {
  render() {
    const { props } = this;
    const { text, subject, id, textIndex } = props;
    const { image, largeImage, publicId } = text;
    return (
      props.loading
        ? <Spinner top="0" bottom="0" right="0" left="0" margin="auto" size="30px" storyboard />
        : (
          <Buttons >
            <LinkBtn
              disabled={props.disabled}
              margin="5px auto"
              onClick={() => props.toggleCurrentText(text, textIndex)}
              size="1.2rem"
              storyboard
              title={!props.disabled ? "see full text" : null}
            >
              <i className="far fa-eye"></i>
            </LinkBtn>

            <LinkBtn
              disabled={props.disabled}
              margin="5px auto"
              onClick={() => props.toggleSingleEdit(subject, text)}
              size="1.2rem"
              storyboard
              title={!props.disabled ? "edit text" : null}
            >
              <i className="fas fa-edit"></i>
            </LinkBtn>

            <LinkBtn
              disabled={props.disabled || image}
              margin="5px auto"
              onClick={() => props.uploadImageModal(id)}
              storyboard
              size="1.2rem"
              title={!props.disabled
                ? (
                  image
                    ? "you must delete the current image before uploading another"
                    : "upload text image"
                ) : null}
            >
              <i className="fas fa-upload"></i>
            </LinkBtn>

            <LinkBtn
              disabled={props.disabled || !text.largeImage}
              margin="5px auto"
              onClick={() => props.imageModal(largeImage, publicId, id, "item")}
              storyboard
              size="1.2rem"
              title={!props.disabled
                ? (
                  image
                    ? "see larger image"
                    : "no image has been uploaded for this text"
                ) : null}
            >
              <i className="far fa-images"></i>
            </LinkBtn>

            <LinkBtn
              delete
              disabled={props.disabled}
              margin="5px auto"
              onClick={() => props.deleteTextModal(text._id, subject._id, textIndex)}
              storyboard
              size="1.2rem"
              title={!props.disabled ? "delete text" : null}
            >
              <i className="far fa-trash-alt" />
            </LinkBtn>
          </Buttons>
        )
    );
  }
};