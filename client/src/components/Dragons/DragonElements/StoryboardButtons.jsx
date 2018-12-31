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
    console.log(this.props)
    const { props } = this;
    const { text, subject, id, index } = props;
    const { image, largeImage, publicId } = text;
    return (
      props.loading
        ? <Spinner top="0" bottom="0" right="0" left="0" margin="auto" size="30px" storyboard />
        : (

          <Buttons >
            <LinkBtn
              onClick={() => props.toggleCurrentText(text)}
              disabled={props.disabled}
              margin="5px auto"
              size="1.2rem"
              storyboard
              underline
              title="see full text"
            >
              <i className="far fa-eye"></i>
            </LinkBtn>

            <LinkBtn
              onClick={() => props.toggleSingleEdit(subject, text)}
              disabled={props.disabled}
              margin="5px auto"
              size="1.2rem"
              storyboard
              underline
              title="edit text"
            >
              <i className="fas fa-edit"></i>
            </LinkBtn>

            <LinkBtn
              margin="5px auto"
              storyboard
              underline
              size="1.2rem"
              disabled={props.disabled || text.image || text.largeImage}
              onClick={() => props.uploadImageModal(id)}
              title={text.image
                ? "you must delete the current image before uploading another"
                : "upload project image"}
            >
              <i className="fas fa-upload"></i>
            </LinkBtn>

            <LinkBtn
              margin="5px auto"
              storyboard
              underline
              size="1.2rem"
              disabled={props.disabled}
              onClick={() => props.imageModal(largeImage, publicId, id, "item")}
              title="see larger image"
            >
              <i className="far fa-images"></i>
            </LinkBtn>
          </Buttons>
        )
    );
  }
};