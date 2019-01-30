import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ProjectButtons } from "../Dragons/DragonElements";
import { Button, Input, Label, TextArea } from "../Forms/FormElements";
import { NewProjectForm } from "../Forms";
import { API } from '../../utils';

const DropZone = styled.div`
  padding: 15px;
  width: 100%;
`;

const Container = styled.div`
  background: ${props => props.isDragging
    ? "rgba(22, 136, 130, 0.487)"
    : "rgba(22, 136, 130, 0.337)"};
  border-radius: 5px;
  box-shadow: ${props => (
    props.isDragging
      ? `0 0 15px rgb(38, 212, 204),
       0 0 10px rgb(38, 212, 204),
       0 0 5px rgb(38, 212, 204),
       0 0 2px rgb(38, 212, 204),
       inset 0 0 10px 0 rgb(38, 212, 204)`
      : '4px 4px 4px rgb(0,0,0)'
  )};  
  border-left: 1px solid rgb(255, 255, 255, 0.283);
  border-top: 1px solid rgb(255, 255, 255, 0.533);
  line-height: 1.2;
  margin: 0 auto 10px auto;
  padding: 20px 15px;
  position: relative;
  transition: background-color 0.1s ease-in-out;
  width: 560px;
  &:hover {
    background: rgba(22, 136, 130, 0.487);
  }
  h2 {
    color: #fff;
    font-family: ${props => props.theme.hTypeface};
    font-size: 3.5rem;
    text-shadow: 2px 2px 3px rgb(0,0,0);
    width: 450px;
  }
  p {
    color: #fff;
    font-size: 2rem;
    text-indent: 25px;
    text-shadow: 2px 2px 3px rgb(0,0,0);
  }
`;

export class ProjectList extends Component {
  state = {
    create: false,
    title: '',
    summary: '',
    link: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  toggleProjectForm = () => {
    this.setState({ create: !this.state.create });
  };

  updateProject = (e, project) => {
    e.preventDefault();
    const { link, summary, title } = this.state;
    const newProjectData = { link, summary, title }
    this.props.updateProject(project, newProjectData, this.props.closeModal);
    this.props.closeModal();
  };

  updateProjectModal = project => {
    this.props.setModal({
      body: (
        <form>
          <Label>Project Title:</Label>
          <Input
            type="text"
            name="title"
            maxLength="40"
            onChange={this.handleInputChange}
            placeholder="40-character limit"
          />
          <Label>Project Summary:</Label>
          <TextArea
            type="text"
            name="summary"
            maxLength="140"
            onChange={this.handleInputChange}
            placeholder="140-character limit"
          />
          <Label>Project Keyword:</Label>
          <Input
            name="link"
            type="text"
            maxLength="12"
            onChange={this.handleInputChange}
            placeholder="12-character limit"
          />
          <Button onClick={(e) => this.updateProject(e, project)}>Submit</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </form>
      )
    })
  };

  deleteProjectModal = async id => {
    this.props.setModal({
      body: (
        <Fragment>
          <h3>Are you sure you want to delete this entire project?</h3>
          <p>(and all associated texts and topic columns)</p>
        </Fragment>
      ),
      buttons: (
        <Fragment>
          <Button onClick={() => this.props.deleteProject(id, this.props.closeModal)}>Yes, Delete</Button>
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Fragment>
      ),
      style: { textAlign: "center" }
    })
  };

  render() {
    const { projectOrder, projectOrderData } = this.props;
    return (
      <Fragment>
        {this.state.create
          ? (
            <NewProjectForm
              addNewProject={this.props.addNewProject}
              closeModal={this.props.closeModal}
              projectOrder={projectOrder}
              setModal={this.props.setModal}
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
                              <h2>{thisProject.title}</h2>
                              <p>{thisProject.summary}</p>
                            </Link>
                            <ProjectButtons
                              updateProjectModal={this.updateProjectModal}
                              deleteProjectModal={this.deleteProjectModal}
                              imageModal={this.props.imageModal}
                              loading={this.props.loading}
                              project={thisProject}
                              uploadImageModal={this.props.uploadImageModal}
                            />
                          </Container>
                        )}
                      </Draggable>
                    )
                  })}
                  <Button
                    disabled={projectOrder.length > 19}
                    full
                    onClick={this.toggleProjectForm}
                  >
                    Create New Project
                  </Button>
                  {provided.placeholder}
                </DropZone>
              )}
            </Droppable>
          )}
      </Fragment>
    )
  }
};