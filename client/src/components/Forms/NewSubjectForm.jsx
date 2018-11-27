import React, { Component } from "react";
import styled from "styled-components";
import { Button, Input, Label, TextArea } from "./FormElements";
import { API } from "../../utils";

const Container = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 8px;
`;

class NewSubjectForm extends Component {
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
        <Label>Column Topic:</Label>
        <Input
          name="subject"
          value={this.state.subject}
          type="text"
          onChange={this.handleInputChange}
          placeholder="enter topic"
        />
        <Label>Column Theme:</Label>
        <TextArea
          name="theme"
          value={this.state.theme}
          type="text"
          maxLength="100"
          rows="3"
          onChange={this.handleInputChange}
          placeholder="(100 characters max)"
        />
        <Button
          disabled={!this.state.subject || !this.state.theme}
          onClick={this.createSubject}
        >
          Create
         </Button>
        <Button onClick={this.props.toggleSubjectForm}>Cancel</Button>
      </Container>
    )
  }
};

export default NewSubjectForm;