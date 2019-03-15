import React from "react";
import styled from 'styled-components';
import { LinkBtn } from "../../PageElements";
import { Spinner } from "../../Styles";

const Buttons = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const ProjectButtons = React.memo(props => {
  const { _id, image, publicId } = props.project;
  return (props.loading
    ? (
      <Spinner top="8px" right="44px" size="12px" />
    ) : (
      <Buttons>
        <LinkBtn
          disabled={props.disabled}
          onClick={() => props.updateProjectModal(props.project)}
          padding="0 4px 4px 4px"
          title="edit project info"
        >
          <i className="fas fa-edit"></i>
        </LinkBtn>

        <LinkBtn
          disabled={props.disabled || image}
          onClick={() => props.uploadImageModal(_id)}
          padding="0 4px 4px 4px"
          title={image
            ? "you must delete the current image before uploading another"
            : "upload project image"
          }
        >
          <i className="fas fa-upload"></i>
        </LinkBtn>

        <LinkBtn
          disabled={props.disabled || !image}
          onClick={() => props.imageModal(image, publicId, _id, "project")}
          padding="0 4px 4px 4px"
          title={image
            ? "see image for this project"
            : "no image has been uploaded for this project"
          }
        >
          <i className="far fa-images"></i>
        </LinkBtn>

        <LinkBtn
          delete
          disabled={props.disabled}
          onClick={() => props.deleteProjectModal(_id)}
          padding="0 4px 4px 4px"
          title="delete project"
        >
          <i className="fas fa-trash-alt"></i>
        </LinkBtn>
      </Buttons>
    )
  );
})