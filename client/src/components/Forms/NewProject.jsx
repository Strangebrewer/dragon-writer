import React, { Component } from 'react';
import styled from "styled-components";
import { Button, Input, TextArea } from "./FormElements";
import { API } from "../../utils";

const Container = styled.div`
  width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid green;
`;

export class NewProject extends Component {
  state = {
    title: '',
    summary: '',
    link: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  createProject = async () => {
    await API.createProject({
      title: this.state.title,
      summary: this.state.summary,
      link: this.state.link,
      userId: this.props.user._id
    })
    await this.props.getInitialData(this.props.user);
    this.props.toggleProjectForm();
  };

  render() {
    return (
      <Container>
        <Input
          name="title"
          value={this.state.title}
          type="text"
          onChange={this.handleInputChange}
          placeholder="project title"
        />
        <TextArea
          name="summary"
          value={this.state.summary}
          type="text"
          onChange={this.handleInputChange}
          placeholder="project summary"
        />
        <Input
          name="link"
          value={this.state.link}
          type="text"
          maxLength="12"
          onChange={this.handleInputChange}
          placeholder="project keyword (12 characters or less)"
        />
        <Button onClick={this.createProject}>Create</Button>
        <Button onClick={this.props.toggleProjectForm}>Cancel</Button>
      </Container>
    );
  }
};;