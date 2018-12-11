import React, { Fragment, PureComponent } from "react";
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";
import { Spinner } from "../../Styles";

const Links = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export class ProjectButtons extends PureComponent {
  render() {
    const { props } = this;
    const { _id, publicId, image } = props.project;
    return (
      <Fragment>
        {props.loading
          ? (
            <Spinner top="8px" right="44px" size="12px" />
          ) : (
            <Links>
              <LinkBtn
                padding="0 4px 4px 4px"
                underline
                disabled={props.disabled}
                onClick={() => props.updateProjectModal(props.project)}
                title="edit project info"
              >
                <i className="fas fa-edit"></i>
              </LinkBtn>

              <LinkBtn
                padding="0 4px 4px 4px"
                underline
                disabled={props.disabled || image}
                onClick={() => props.uploadImageModal(_id)}
                title={image ? "you must delete the current image before uploading another" : "upload project image"}
              >
                <i className="fas fa-upload"></i>
              </LinkBtn>

              <LinkBtn
                padding="0 4px 4px 4px"
                underline
                disabled={props.disabled}
                onClick={() => props.imageModal(image, publicId, _id, "project")}
                title="see project image"
              >
                <i className="far fa-images"></i>
              </LinkBtn>

              <LinkBtn
                padding="0 4px 4px 4px"
                underline
                disabled={props.disabled}
                // onClick={() => props.imageModal(image, publicId, _id)}
                title="storyboard mode"
              >
                <i className="fas fa-th"></i>
              </LinkBtn>

              <LinkBtn
                padding="0 4px 4px 4px"
                underline
                disabled={props.disabled}
                delete
                onClick={() => props.deleteProjectModal(_id)}
                title="delete project"
              >
                <i className="fas fa-trash-alt"></i>
              </LinkBtn>
            </Links>
          )}
      </Fragment>
    );
  }
};