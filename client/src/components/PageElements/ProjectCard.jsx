import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ProjectButtons } from "../Dragons/DragonElements";
import { Button, Input, TextArea } from "../Forms/FormElements";
import { NewProject } from "../Forms";
import { API } from '../../utils';

const DropZone = styled.div`
  width: 100%;  
`;

const Container = styled.div`
  background-color: ${props => props.theme.projectItemBG};
  position: relative;
  width: 560px;
  padding: 15px;
  border: 1px solid ${props => props.theme.links};
  border-radius: 5px;
  margin: 0 auto 10px auto;
  line-height: 1.2;
  &:hover {
    border: 1px solid ${props => props.theme.columnDragBorder};
    box-shadow: ${props => props.theme.columnBS};
  }
  box-shadow: ${props => props.isDragging && props.theme.columnBS};
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

export class ProjectCard extends Component {
  state = {
    create: false,
    title: '',
    summary: '',
    link: '',
    loading: false,
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  toggleProjectForm = () => {
    this.setState({ create: !this.state.create });
  };

  deleteProject = async id => {
    await this.setState({ loading: true });
    this.props.closeModal();
    await API.deleteProject(id);
    this.props.getInitialData(this.props.user);
    this.setState({ loading: false })
  };

  updateProject = async project => {
    await this.setState({ loading: true });
    this.props.closeModal();
    const { title, summary, link } = this.state;
    const updateObject = {};

    if (title) updateObject.title = title;
    else updateObject.title = project.title;
    if (summary) updateObject.summary = summary;
    else updateObject.summary = project.summary;
    if (link) updateObject.link = link;
    else updateObject.link = project.link;

    await API.updateProject(project._id, updateObject);;
    this.props.getInitialData(this.props.user)
    this.setState({ loading: false });
  };

  updateProjectModal = project => {
    this.props.setModal({
      body: (
        <Fragment>
          <Input
            type="text"
            name="title"
            onChange={this.handleInputChange}
            placeholder="project title"
          />
          <TextArea
            type="text"
            name="summary"
            onChange={this.handleInputChange}
            placeholder="project summary"
          />
          <Input
            name="link"
            type="text"
            maxLength="12"
            onChange={this.handleInputChange}
            placeholder="project keyword (12 characters max)"
          />
        </Fragment>
      ),
      buttons: (
        <Fragment>
          <Button onClick={() => this.updateProject(project)}>Submit</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Fragment>
      )
    })
  };

  deleteProjectModal = async id => {
    this.props.setModal({
      body: <h3>Are you sure you want to delete this entire project and all associated texts and topic columns?</h3>,
      buttons: (
        <Fragment>
          <Button onClick={() => this.deleteProject(id)}>Yes, Delete</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Fragment>
      )
    })
  };

  render() {
    const { projectOrder, projectOrderData } = this.props;
    return (
      <Fragment>
        {this.state.create
          ? (
            <NewProject
              getInitialData={this.props.getInitialData}
              toggleProjectForm={this.toggleProjectForm}
              user={this.props.user}
            />
          ) : (
            <Droppable droppableId={this.props.user._id} type="project">
              {(provided, snapshot) => (
                <DropZone
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {projectOrder.map((project, index) => {
                    const thisProject = projectOrderData[project];
                    return (
                      <Draggable draggableId={project} index={index} key={project}>
                        {(provided, snapshot) => (
                          <Container
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                            {...provided.dragHandleProps}
                          >
                            <Link to={`/${thisProject.link}`}>
                              <ProjectTitle>{thisProject.title}</ProjectTitle>
                              <ProjectText  >{thisProject.summary}</ProjectText>
                            </Link>
                            <ProjectButtons
                              updateProjectModal={this.updateProjectModal}
                              deleteProjectModal={this.deleteProjectModal}
                              imageModal={this.props.imageModal}
                              disabled={this.props.loading}
                              project={thisProject}
                              uploadImageModal={this.props.uploadImageModal}
                            />
                          </Container>
                        )}
                      </Draggable>
                    )
                  })}
                  <Button full round onClick={this.toggleProjectForm}>Create New Project</Button>
                  {provided.placeholder}
                </DropZone>
              )}
            </Droppable>
          )}
      </Fragment>
    )
  }
};