import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/Elements/FormElements";
import { NewProject } from "./Elements/Forms";

const Container = styled.div`
  width: 600px;
  padding: 15px;
  border: 1px solid green;
  margin: auto;
  line-height: 1.2;
`;

const LinkBtn = styled.button`
  background: transparent;
  border: none;
  outline: transparent;
  color: ${props => props.theme.secondary};
  padding: 0 10px 0 0;
  text-decoration: underline;
  cursor: pointer;
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
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </Link>
            <LinkBtn onClick={() => props.updateProjectModal(project)}>edit</LinkBtn>
          </Container>
        ))}
        <Button onClick={props.toggleProjectForm}>Create New Project</Button>
      </Fragment>}
  </Fragment>
);

export default ProjectCard;