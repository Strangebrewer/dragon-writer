import React, { Component } from 'react';
import styled from "styled-components";
import { Button, Input, Label, TextArea } from "./FormElements";
import { API } from "../../utils";

const Container = styled.form`
  background: linear-gradient(rgba(38, 212, 204, 0.267), rgba(38, 212, 204, 0.267)),
   linear-gradient(rgb(0,0,0), rgb(0,0,0));
  border: 1px solid rgb(38, 212, 204);
  border-radius: 12px;
  box-shadow: 0 0 1px #000,
    0 0 2px #000,
    0 0 4px #000,
    0 0 8px #111,
    0 0 10px #111,
    0 0 20px #222,
    0 0 40px #aaa,
    inset 0 0 100px 30px rgb(0,0,0);
  margin: auto;
  padding: 30px;
  width: 300px;
`;

export class NewProjectForm extends Component {
  state = {
    title: '',
    summary: '',
    link: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  createProject = async e => {
    e.preventDefault();
    let error;
    let project;
    const { link, summary, title } = this.state;
    try {
      // keep the create project here to help control app flow
      project = await API.createProject({
        title,
        summary,
        link,
        userId: this.props.user._id
      });
      console.log(project.data)
      if (project.data.customMessage) throw project.data;
    }
    catch (err) {
      error = err;
      if (err.customMessage)
        this.props.setModal({
          body: <p>{err.customMessage}</p>,
          buttons: <Button onClick={this.props.closeModal}>OK</Button>
        });
      else
        this.props.setModal({
          body: <p>Something went wrong with your request. Please try again.</p>,
          buttons: <Button onClick={this.props.closeModal}>OK</Button>
        });
    }
    if (!error)
      this.props.addNewProject(project.data._id, this.props.toggleProjectForm);
  }

  render() {
    return (
      <Container>
        <Label>Project Title:</Label>
        <Input
          name="title"
          value={this.state.title}
          type="text"
          maxLength="40"
          onChange={this.handleInputChange}
          placeholder="40-character limit"
        />
        <Label>Project Summary:</Label>
        <TextArea
          name="summary"
          value={this.state.summary}
          type="text"
          maxLength="140"
          onChange={this.handleInputChange}
          placeholder="140-character limit"
        />
        <Label>Project Keyword:</Label>
        <Input
          name="link"
          value={this.state.link}
          type="text"
          maxLength="12"
          onChange={this.handleInputChange}
          placeholder="12-character limit"
        />
        <Button onClick={e => this.createProject(e)}>Create</Button>
        <Button onClick={this.props.toggleProjectForm}>Cancel</Button>
      </Container>
    );
  }
};;