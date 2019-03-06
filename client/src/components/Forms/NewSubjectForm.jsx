import React, { Component } from "react";
import styled from "styled-components";
import { Button, Input, Label, TextArea } from "./FormElements";
import { API } from "../../utils";

const Container = styled.div`
  margin: auto;
  padding-top: 8px;
  width: 100%;
  .subject-checkbox, .checkbox-label {
    display: inline-block;
  }
  .subject-checkbox {
    margin: 0 0 0 15px;
    vertical-align: text-bottom;
  }
`;

class NewSubjectForm extends Component {
  state = {
    subject: '',
    theme: ''
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  buildHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { "Authorization": `Bearer ${token}` } };
  }

  createSubject = async () => {
    const headers = this.buildHeaders();
    const subject = await API.createSubject({
      subject: this.state.subject,
      theme: this.state.theme,
      published: this.state.published,
      projectId: this.props.projectId
    }, headers);
    this.props.addSubjectToOrder(subject.data);
  };

  render() {
    return (
      <Container>
        <Label>Column Topic:</Label>
        <Input
          name="subject"
          value={this.state.subject}
          type="text"
          maxLength="22"
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