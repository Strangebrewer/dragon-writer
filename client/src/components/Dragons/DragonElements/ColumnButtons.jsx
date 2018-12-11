import React, { Fragment, PureComponent } from "react";
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";
import { Spinner } from "../../Styles";

const Buttons = styled.div`
  position: absolute;
  top: 6px;
  left: 8px;
  display: flex;
  justify-content: space-between;
`;

export class ColumnButtons extends PureComponent {
  render() {
    const { props } = this;
    const { subject, id, index } = props;
    const { image, publicId } = subject;
    return (
      props.loading
        ? <Spinner top="8px" left="54px" size="12px" />
        : (
          <Fragment>
            <Buttons>
              <LinkBtn
                disabled={props.disabled}
                padding="0 3px 5px 3px"
                onClick={() => props.toggleInlineNew(subject)}
                title={`create new item for ${subject.subject} column`}
              >
                <i className="far fa-file-alt"></i>
              </LinkBtn>

              <LinkBtn
                disabled={props.disabled}
                onClick={() => props.toggleDragonText(id)}
                padding="0 3px 5px 3px"
                title="expand column to read all full texts"
              >
                <i className="far fa-eye"></i>
              </LinkBtn>

              <LinkBtn
                disabled={props.disabled}
                onClick={() => props.updateSubjectModal(subject)}
                padding="0 3px 5px 3px"
                title="update column name"
              >
                <i className="fas fa-edit"></i>
              </LinkBtn>

              <LinkBtn
                disabled={props.disabled || image}
                onClick={() => props.uploadImageModal(id)}
                padding="0 3px 5px 3px"
                title={image ? "you must delete the current image before uploading another" : "upload project image"}
              >
                <i className="fas fa-upload"></i>
              </LinkBtn>

              <LinkBtn
                disabled={props.disabled}
                onClick={() => props.imageModal(image, publicId, id, "column")}
                padding="0 3px 5px 3px"
                title="see project image"
              >
                <i className="far fa-images"></i>
              </LinkBtn>

              <LinkBtn
                disabled={props.disabled}
                // onClick={() => props.imageModal(image, publicId, id)}
                padding="0 3px 5px 3px"
                title="storyboard mode"
              >
                <i className="fas fa-th"></i>
              </LinkBtn>              

              <LinkBtn
                delete
                disabled={props.disabled}
                onClick={() => props.deleteSubjectModal(id, index)}
                padding="0 3px 5px 3px"
                title="delete this column"
              >
                <i className="fas fa-trash-alt"></i>
              </LinkBtn>
            </Buttons>
            <LinkBtn
              disabled={props.disabled}
              onClick={() => props.toggleSubject(id)}
              padding="0 4px 5px 0"
              position="absolute"
              top="2px"
              right="3px"
              size="2rem"
              title="close this column"
            >
              &times;
            </LinkBtn>
          </Fragment>
        )
    )
  }
}