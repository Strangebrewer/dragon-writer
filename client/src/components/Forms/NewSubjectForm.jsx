import React, { useState } from "react";
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

const NewSubjectForm = props => {

  const [subject, setSubject] = useState('');
  const [theme, setTheme] = useState('');

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === 'subject') setSubject(value);
    if (name === 'theme') setTheme(value);
  };

  function buildHeaders() {
    const token = localStorage.getItem('token');
    return { headers: { "Authorization": `Bearer ${token}` } };
  }

  async function createSubject() {
    const headers = buildHeaders();
    const newSubject = await API.createSubject({
      subject,
      theme,
      projectId: props.projectId
    }, headers);
    props.addSubjectToOrder(newSubject.data);
  };


  return (
    <Container>
      <Label>Column Topic:</Label>
      <Input
        name="subject"
        value={subject}
        type="text"
        maxLength="22"
        onChange={handleInputChange}
        placeholder="enter topic"
      />
      <Label>Column Theme:</Label>
      <TextArea
        name="theme"
        value={theme}
        type="text"
        maxLength="100"
        rows="3"
        onChange={handleInputChange}
        placeholder="(100 characters max)"
      />
      <Button
        disabled={!subject || !theme}
        onClick={createSubject}
      >
        Create
         </Button>
      <Button onClick={props.toggleSubjectForm}>Cancel</Button>
    </Container>
  )
};

export default NewSubjectForm;