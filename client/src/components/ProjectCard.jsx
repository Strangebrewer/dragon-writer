import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LinkBtn } from "./Elements";
import { Button } from "./Forms/FormElements";
import { NewProject } from "./Forms";

const Container = styled.div`
  background-color: ${props => props.theme.projectItemBG};
  position: relative;
  width: 600px;
  padding: 15px;
  border: 1px solid ${props => props.theme.links};
  border-radius: 5px;
  margin: 10px auto;
  line-height: 1.2;
  &:hover {
    border: 1px solid ${props => props.theme.columnDragBorder};
    box-shadow: ${props => props.theme.columnBS};
  }
`;

const ProjectTitle = styled.h2`
  color: ${props => props.theme.projectItemColor};
  font-family: ${props => props.theme.hTypeface};
  font-size: 3.5rem;
`;

const ProjectText = styled.p`
  color: ${props => props.theme.projectItemColor};
  text-indent: 25px;
  font-size: 2rem;
`;

const Links = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const ProjectCard = props => (
  <Fragment>
    {props.create
      ? (
        <NewProject
          user={props.user}
          getProjects={props.getProjects}
          toggleProjectForm={props.toggleProjectForm}
        />
      ) : props.authenticated &&
      <Fragment>
        {props.projects.map(project => (
          <Container key={project._id}>
            <Link to={`/${project.link}`}>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectText  >{project.summary}</ProjectText>
            </Link>
            <Links>
              <LinkBtn
                padding="0 10px 0 0"
                underline
                onClick={() => props.updateProjectModal(project)}>edit</LinkBtn>
              <LinkBtn
                padding="0 10px 0 0"
                underline
                delete
                onClick={() => props.deleteProjectModal(project)}>delete</LinkBtn>
            </Links>
          </Container>
        ))}
        <Button onClick={props.toggleProjectForm}>Create New Project</Button>
      </Fragment>}
  </Fragment>
);

export default ProjectCard;