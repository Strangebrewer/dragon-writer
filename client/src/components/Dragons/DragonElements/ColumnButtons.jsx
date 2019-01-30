import React, { Fragment, PureComponent } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";
import { Spinner } from "../../Styles";

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 6px;
  left: 8px;
  a {
    color: ${props => props.theme.mainColor};
    font-size: 1.5rem;
    transition: ${props => props.theme.colorTrans};
    &:hover {
      color: ${props => !props.disabled && "#26d4cc"};
    }
  }
`;

export class ColumnButtons extends PureComponent {
  render() {
    const { props } = this;
    const { id, index, subject, texts } = props;
    const { image, publicId } = subject;
    return (
      props.loading
        ? <Spinner top="8px" left="54px" size="12px" />
        : (
          <Fragment>
            <Buttons>
              <LinkBtn
                disabled={props.disabled}
                onClick={() => props.toggleInlineNew(subject)}
                padding="0 3px 5px 3px"
                title={!props.disabled ? `create new text for ${subject.subject}` : null}
              >
                <i className="far fa-file-alt"></i>
              </LinkBtn>

              <LinkBtn
                disabled={props.disabled}
                onClick={() => props.toggleDragonText(id)}
                padding="0 3px 5px 3px"
                title={!props.disabled ? "expand column to read all full texts" : null}
              >
                <i className="far fa-eye"></i>
              </LinkBtn>

              <LinkBtn
                disabled={props.disabled}
                onClick={() => props.updateSubjectModal(subject)}
                padding="0 3px 5px 3px"
                title={!props.disabled ? "update column name" : null}
              >
                <i className="fas fa-edit"></i>
              </LinkBtn>

              <LinkBtn
                disabled={props.disabled || image}
                onClick={() => props.uploadImageModal(id)}
                padding="0 3px 5px 3px"
                title={!props.disabled
                  ? (
                    image
                      ? "you must delete the current image before uploading another"
                      : "upload image for this column"
                  ) : null}
              >
                <i className="fas fa-upload"></i>
              </LinkBtn>

              <LinkBtn
                disabled={props.disabled || !image}
                onClick={() => props.imageModal(image, publicId, id, "column")}
                padding="0 3px 5px 3px"
                title={!props.disabled
                  ? (
                    image
                      ? "see image for this column"
                      : "no image has been uploaded for this column"
                  ) : null}
              >
                <i className="far fa-images"></i>
              </LinkBtn>

              <LinkBtn
                disabled={props.disabled}
                onClick={() => props.toggleStoryboard(id)}
                padding="0 3px 5px 3px"
                title={!props.disabled ? "storyboard view" : null}
              >
                <i className="fas fa-th"></i>
              </LinkBtn>

              {/* when buttons are disabled, make this a button so the link won't work */}
              {props.disabled
                ? (
                  <LinkBtn disabled={props.disabled} padding="0 3px 5px 3px">
                    <i className="fas fa-print"></i>
                  </LinkBtn>
                ) : (
                  <Link
                    style={{ padding: "1px 3px 5px 3px" }}
                    title={!props.disabled ? "print view" : null}
                    to={{ pathname: "/print", state: { texts, subject } }}
                  >
                    <i className="fas fa-print"></i>
                  </Link>
                )
              }

              <LinkBtn
                delete
                disabled={props.disabled}
                onClick={() => props.deleteSubjectModal(id, index)}
                padding="0 3px 5px 3px"
                title={!props.disabled ? "delete this column" : null}
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
              title={!props.disabled ? "close this column" : null}
            >
              &times;
            </LinkBtn>
          </Fragment>
        )
    )
  }
}