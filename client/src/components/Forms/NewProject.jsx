import React, { Component } from 'react';
import styled from "styled-components";
import { Button, Input, TextArea } from "./FormElements";
import { API } from "../../utils";

const Container = styled.div`
  border: 1px solid green;
  margin: auto;
  padding: 20px;
  width: 300px;
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
    const { link, summary, title } = this.state;
    try {
      const user = await API.createProject({
        title,
        summary,
        link,
        userId: this.props.user._id
      });
      this.props.getInitialData(user.data);
      this.props.toggleProjectForm();
    }
    catch (err) {
      if (err)
        this.setModal({
          body: <p>Something went wrong with your request. Please try again.</p>,
          buttons: <Button onClick={this.props.closeModal}>OK</Button>
        });
    }
  }

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