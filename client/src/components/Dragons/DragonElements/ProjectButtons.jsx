import React, { Fragment } from "react";
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";

const Links = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const ProjectButtons = props => {
  const { _id, publicId, image } = props.project;
  return (
    <Fragment>
      <Links>
        <LinkBtn
          padding="0 4px"
          underline
          onClick={() => props.updateProjectModal(props.project)}
          title="edit project info"
        >
          <i className="fas fa-edit"></i>
        </LinkBtn>

        <LinkBtn
          padding="0 4px"
          underline
          onClick={() => props.uploadImageModal(_id)}
          title="upload project image"
        >
          <i className="fas fa-upload"></i>
        </LinkBtn>

        <LinkBtn
          padding="0 4px"
          underline
          onClick={() => props.imageModal(image, publicId, _id)}
          title="see project image"
        >
          <i className="far fa-images"></i>
        </LinkBtn>

        <LinkBtn
          padding="0 4px"
          underline
          delete
          onClick={() => props.deleteProjectModal(_id)}
          title="edit project info"
        >
          <i className="fas fa-trash-alt"></i>
        </LinkBtn>
      </Links>
    </Fragment>
  );
};