import React, { Component } from "react";
import styled from "styled-components";
import { Button, Input, TextArea } from "../FormElements";
import API from "../../../utils/API";

const Container = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 8px;
`;

export class NewSubjectForm extends Component {
  state = {
    subject: '',
    theme: '',
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  createSubject = async () => {
    const subject = await API.createSubject({
      subject: this.state.subject,
      theme: this.state.theme,
      projectId: this.props.projectId
    });
    this.props.toggleSubjectForm("created", subject.data);
  };

  render() {
    return (
      <Container>
        <Input
          name="subject"
          value={this.state.subject}
          type="text"
          onChange={this.handleInputChange}
          placeholder="subject"
        />
        <TextArea
          name="theme"
          value={this.state.theme}
          type="text"
          maxlength="150"
          rows="3"
          onChange={this.handleInputChange}
          placeholder="subject theme (150 characters max)"
        />
        <Button onClick={this.createSubject}>Create</Button>
        <Button onClick={this.props.toggleSubjectForm}>Cancel</Button>
      </Container>
    )
  }
}