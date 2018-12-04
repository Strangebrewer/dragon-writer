import React, { Fragment } from "react";
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";

const Links = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const Spinner = styled.span`
  position: absolute;
  top: 8px;
  right: 44px;
  width: 12px;
  height: 12px;

  border: solid 2px transparent;
  border-top-color: ${props => props.theme.mainColor};
  border-left-color: ${props => props.theme.mainColor};
  border-radius: 50%;

  -webkit-animation: spinner 400ms linear infinite;
  animation: spinner 400ms linear infinite;
  @-webkit-keyframes spinner {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ProjectButtons = props => {
  const { _id, publicId, image } = props.project;
  return (
    <Fragment>
      {props.disabled
        ? (
          <Spinner />
        ) : (
          <Links>
            <LinkBtn
              padding="0 4px"
              underline
              disabled={props.disabled}
              onClick={() => props.updateProjectModal(props.project)}
              title="edit project info"
            >
              <i className="fas fa-edit"></i>
            </LinkBtn>

            <LinkBtn
              padding="0 4px"
              underline
              disabled={props.disabled}
              onClick={() => props.uploadImageModal(_id)}
              title="upload project image"
            >
              <i className="fas fa-upload"></i>
            </LinkBtn>

            <LinkBtn
              padding="0 4px"
              underline
              disabled={props.disabled}
              onClick={() => props.imageModal(image, publicId, _id)}
              title="see project image"
            >
              <i className="far fa-images"></i>
            </LinkBtn>

            <LinkBtn
              padding="0 4px"
              underline
              disabled={props.disabled}
              delete
              onClick={() => props.deleteProjectModal(_id)}
              title="edit project info"
            >
              <i className="fas fa-trash-alt"></i>
            </LinkBtn>
          </Links>
        )}
    </Fragment>
  );
};