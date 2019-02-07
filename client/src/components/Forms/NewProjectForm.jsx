import React, { Component } from 'react';
import { Button, Form, Input, Label, TextArea } from "./FormElements";
import { API } from "../../utils";

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
      <Form>
        <h2>New Project</h2>
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
        <Button onClick={e => this.createProject(e)}>Submit</Button>
        <Button style={{ margin: "10px auto 0 auto" }} onClick={this.props.toggleProjectForm}>Cancel</Button>
      </Form>
    );
  }
};;